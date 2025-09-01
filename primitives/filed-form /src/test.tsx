// hybrid-form.tsx
import React, { createContext, useCallback, useContext, useMemo, useRef, useState, useSyncExternalStore } from 'react';

class HybridFormStore {
  // 状态
  private values: Store = {};
  private touched: Record<string, boolean> = {};
  private dirty: Record<string, boolean> = {};
  private errors: Record<string, string[]> = {};
  private warnings: Record<string, string[]> = {};
  private validating: Set<string> = new Set();
  private disabled: Set<string> = new Set();

  // 注册字段：name => { ref, options }
  private fields = new Map<string, { options: FieldOptions; refs: any[] }>();

  // 默认值
  private initialValues: Store = {};

  // 订阅
  private bus = new Subject<Notify>();
  private formBus = new Subject<void>(); // 让 useSyncExternalStore 可订阅

  // 回调
  private callbacks: Callbacks = {};

  /** ---------- 写入 API（供外部调用） ---------- */
  setFieldValue = (
    name: NamePath,
    value: any,
    opts?: { shouldDirty?: boolean; shouldTouch?: boolean; shouldValidate?: boolean }
  ) => {
    const key = toPath(name).join('.');
    const prev = this.getValue(key);
    this.values = set(this.values, key, value);

    if (opts?.shouldTouch) this.touched[key] = true;
    if (opts?.shouldDirty) this.dirty[key] = !Object.is(value, this.getInitialValue(key));

    this.bus.next({ name: toPath(key), type: 'value' });
    if (opts?.shouldTouch) this.bus.next({ name: toPath(key), type: 'touch' });
    if (opts?.shouldDirty) this.bus.next({ name: toPath(key), type: 'dirty' });
    this.formBus.next();

    if (!Object.is(prev, value)) {
      this.callbacks.onValuesChange?.(set({}, key, value), this.values);
      this.triggerDependencies(key);
    }
    if (opts?.shouldValidate) {
      void this.validateFields([key]);
    }
  };

  setFieldsValue = (patch: Store) => {
    // 浅合并：逐路径 set，触发依赖和订阅
    const flat = flatten(patch);
    Object.keys(flat).forEach(k => {
      this.setFieldValue(k.split('.'), flat[k], { shouldDirty: true });
    });
    this.bus.next({ type: 'all' });
    this.formBus.next();
  };

  resetFields = (names?: NamePath[]) => {
    if (!names || !names.length) {
      // 全量重置
      this.values = this.initialValues || {};
      this.touched = {};
      this.dirty = {};
      this.errors = {};
      this.warnings = {};
      this.bus.next({ type: 'reset' });
      this.formBus.next();
      return;
    }
    names.forEach(n => {
      const key = toPath(n).join('.');
      const iv = this.getInitialValue(key);
      if (typeof iv === 'undefined') this.values = unset(this.values, key);
      else this.values = set(this.values, key, iv);
      delete this.touched[key];
      delete this.dirty[key];
      delete this.errors[key];
      delete this.warnings[key];
      this.bus.next({ name: toPath(key), type: 'value' });
      this.bus.next({ name: toPath(key), type: 'errors' });
    });
    this.formBus.next();
  };

  setFields = (
    fields: { errors?: string[]; name: NamePath; touched?: boolean; value?: any; warnings?: string[] }[]
  ) => {
    fields.forEach(f => {
      const key = toPath(f.name).join('.');
      if ('value' in f) this.values = set(this.values, key, f.value);
      if (f.touched) this.touched[key] = true;
      if (f.errors) this.errors[key] = f.errors;
      if (f.warnings) this.warnings[key] = f.warnings;
      this.bus.next({ name: toPath(key), type: 'value' });
      this.bus.next({ name: toPath(key), type: 'errors' });
    });
    this.callbacks.onValuesChange?.({}, this.values);
    this.formBus.next();
  };

  clearErrors = (names?: NamePath | NamePath[]) => {
    const list = !names
      ? Object.keys(this.errors)
      : (Array.isArray(names) ? names : [names]).map(n => toPath(n).join('.'));
    list.forEach(k => delete this.errors[k]);
    this.bus.next({ name: null, type: 'errors' });
    this.formBus.next();
  };

  setError = (name: NamePath, msgs: string[]) => {
    const key = toPath(name).join('.');
    this.errors[key] = msgs;
    this.bus.next({ name: toPath(key), type: 'errors' });
    this.formBus.next();
  };

  disableField = (name: NamePath, disabled = true) => {
    const key = toPath(name).join('.');
    if (disabled) this.disabled.add(key);
    else this.disabled.delete(key);
    this.formBus.next();
  };

  /** ---------- 校验 ---------- */
  private getRules = (key: string) => this.fields.get(key)?.options.rules || [];

  private async validateOne(name: string, opts?: ValidateOptions): Promise<FieldError> {
    const key = name;
    const rules = this.getRules(key);
    const value = this.getValue(key);
    const errors: string[] = [];
    const warnings: string[] = [];

    const shouldRun = (r: Rule): boolean => {
      const t = (opts?.triggerName || '').toLowerCase();
      const configured = (r as any).trigger;
      if (!configured) return true; // 未指定 trigger 时，任何时机均可触发
      const arr = Array.isArray(configured) ? configured : [configured];
      return t ? arr.map(x => x.toLowerCase()).includes(t) : true;
    };

    const push = (msg?: string, warn?: boolean) => {
      if (!msg) return;
      (warn ? warnings : errors).push(msg);
    };

    for (const rule of rules) {
      if (!shouldRun(rule)) continue;

      // required
      if ('required' in rule && rule.required) {
        const empty =
          value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
        if (empty) push(rule.message || 'This field is required', (rule as any).warningOnly);
        if (empty) continue; // 其他规则往往可跳过
      }

      // len/min/max
      if ('len' in rule || 'min' in rule || 'max' in rule) {
        const vlen = typeof value === 'string' || Array.isArray(value) ? value.length : Number(value);
        if (rule.len != null && vlen !== rule.len)
          push(rule.message || `Length must be ${rule.len}`, (rule as any).warningOnly);
        if (rule.min != null && vlen < (rule.min as number))
          push(rule.message || `Min ${rule.min}`, (rule as any).warningOnly);
        if (rule.max != null && vlen > (rule.max as number))
          push(rule.message || `Max ${rule.max}`, (rule as any).warningOnly);
      }

      // pattern
      if ('pattern' in rule && rule.pattern) {
        if (value != null && String(value) !== '' && !rule.pattern.test(String(value))) {
          push(rule.message || 'Pattern not match', (rule as any).warningOnly);
        }
      }

      // 自定义
      if ('validator' in rule && typeof rule.validator === 'function') {
        try {
          const maybe = rule.validator(value, this.values);
          if (maybe && typeof (maybe as Promise<void>).then === 'function') {
            this.validating.add(key);
            this.bus.next({ name: [toPath(key)], on: true, type: 'validating' });
            await maybe;
          }
        } catch (e: any) {
          push(e?.message || rule.message || 'Validation error', (rule as any).warningOnly);
        } finally {
          this.validating.delete(key);
          this.bus.next({ name: [toPath(key)], on: false, type: 'validating' });
        }
      }
    }

    // 保存
    this.errors[key] = errors;
    this.warnings[key] = warnings;

    return { errors, name: toPath(key), warnings };
  }

  validateFields = async (nameList?: NamePath[] | string[], options?: ValidateOptions) => {
    const keys =
      !nameList || !nameList.length
        ? Array.from(this.fields.keys())
        : (nameList as any[]).map(n => (Array.isArray(n) ? n.join('.') : String(n)));

    const settle = await Promise.all(keys.map(k => this.validateOne(k, options)));
    this.bus.next({ name: null, type: 'errors' });
    this.formBus.next();

    const hasError = settle.some(s => s.errors.length);
    if (hasError) {
      const errorList = settle.filter(s => s.errors.length);
      const firstMsg = errorList[0]?.errors?.[0];
      return Promise.reject({
        errorFields: errorList,
        message: firstMsg,
        values: this.values
      });
    }
    return this.values;
  };

  /** ---------- 依赖联动（简版） ---------- */
  private triggerDependencies = (key: string) => {
    const dependents: string[] = [];
    this.fields.forEach((v, name) => {
      const deps = v.options.deps?.map(d => toPath(d).join('.')) || [];
      if (deps.includes(key)) dependents.push(name);
    });
    if (dependents.length) {
      void this.validateFields(dependents);
    }
  };

  /** ---------- 提交 ---------- */
  submit = async () => {
    try {
      const v = await this.validateFields();
      await this.callbacks.onFinish?.(v);
    } catch (e) {
      this.callbacks.onFinishFailed?.(e);
    }
  };

  /** ---------- 外部订阅（字段级精准刷新） ---------- */
  subscribeForm = (cb: () => void) => this.formBus.subscribe(cb);
  subscribe = (cb: (n: Notify) => void) => this.bus.subscribe(cb);

  /** ---------- 聚焦第一个有错的字段 ---------- */
  focusFirstError = () => {
    const first = Object.keys(this.errors).find(k => this.errors[k]?.length);
    if (!first) return;
    const refs = this.fields.get(first)?.refs || [];
    const el = refs.find(r => r && typeof r.focus === 'function');
    el?.focus?.();
  };
}

/** =============== DOM 值读取（不强控） =============== */
function readValueFromDOM(el: any) {
  if (!el) return undefined;
  if (el.type === 'checkbox') {
    if (el.value && el.value !== 'on') {
      // 复选组：以 value 数组表示
      const root = el.form || document;
      const siblings = root.querySelectorAll(`input[name="${el.name}"][type="checkbox"]`);
      const arr: any[] = [];
      siblings.forEach((n: any) => n.checked && arr.push(n.value));
      return arr;
    }
    return Boolean(el.checked);
  }
  if (el.type === 'radio') {
    const root = el.form || document;
    const checked = root.querySelector(`input[name="${el.name}"][type="radio"]:checked`) as any;
    return checked ? checked.value : undefined;
  }
  if (el.tagName === 'SELECT' && el.multiple) {
    return Array.from(el.selectedOptions).map((o: any) => o.value);
  }
  return el.value;
}

/** ================== 上下文/Hook/组件 ================== */
type InternalFormInstance = {
  // 内部
  __store: HybridFormStore;
  getFieldError: (name: NamePath) => string[];
  getFieldsError: (names?: NamePath[]) => { errors: string[]; name: InternalNamePath; warnings: string[] }[];
  getFieldsValue: () => Store;
  // AntD 风格
  getFieldValue: (name: NamePath) => any;
  isFieldsValidating: (names?: NamePath[]) => boolean;
  isFieldTouched: (name: NamePath) => boolean;
  resetFields: HybridFormStore['resetFields'];
  setFields: HybridFormStore['setFields'];
  setFieldsValue: HybridFormStore['setFieldsValue'];
  setFieldValue: HybridFormStore['setFieldValue'];
  submit: HybridFormStore['submit'];
  validateFields: HybridFormStore['validateFields'];
};

const FormCtx = createContext<InternalFormInstance | null>(null);

type FormProps = React.PropsWithChildren<{
  form?: InternalFormInstance;
  initialValues?: Store;
  onFinish?: Callbacks['onFinish'];
  onFinishFailed?: Callbacks['onFinishFailed'];
  onValuesChange?: Callbacks['onValuesChange'];
  shouldFocusError?: boolean;
}>;

export const Form: React.FC<FormProps> = ({
  children,
  form,
  initialValues,
  onFinish,
  onFinishFailed,
  onValuesChange,
  shouldFocusError = true
}) => {
  const [inst] = useForm();
  const instance = form || inst;

  // 初始化
  React.useEffect(() => {
    const s = instance.__store;
    s.setCallbacks({ onFinish, onFinishFailed, onValuesChange });
    s.setInitialValues(initialValues || {}, true);
  }, [instance, initialValues, onValuesChange, onFinish, onFinishFailed]);

  // 提交时焦点定位
  React.useEffect(() => {
    if (!shouldFocusError) return;
    const unsub = instance.__store.subscribe(n => {
      if (n.type === 'errors') {
        // 若是 submit 后错误，可以尝试聚焦
      }
    });
    return unsub;
  }, [instance, shouldFocusError]);

  return <FormCtx.Provider value={instance}>{children}</FormCtx.Provider>;
};

export const useFormInstance = () => {
  const ctx = useContext(FormCtx);
  if (!ctx) throw new Error('Form context not found');
  return ctx;
};

/** ============== RHF 风格：register / handleSubmit / watch / trigger ============== */
export const useHybridForm = () => {
  const form = useFormInstance();
  const store = form.__store;

  const register = useCallback(
    (name: NamePath, options?: FieldOptions): RegisterReturn => store.register(name, options),
    [store]
  );

  const handleSubmit =
    (onValid: (values: Store, e?: any) => any, onInvalid?: (errors: any, e?: any) => any) => async (e?: any) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      try {
        const v = await store.validateFields();
        await onValid(v, e);
      } catch (err) {
        onInvalid?.(err, e);
        if (err?.errorFields?.length) store.focusFirstError();
      }
    };

  const setValue = (
    name: NamePath,
    value: any,
    opts?: { shouldDirty?: boolean; shouldTouch?: boolean; shouldValidate?: boolean }
  ) => store.setFieldValue(name, value, opts);

  const trigger = async (names?: NamePath | NamePath[], opts?: { trigger?: string }) => {
    const list = !names ? undefined : Array.isArray(names) ? names : [names];
    try {
      await store.validateFields(list as any, { triggerName: opts?.trigger });
      return true;
    } catch {
      return false;
    }
  };

  const watch = (selector?: NamePath | NamePath[]) => {
    const subscribe = (cb: () => void) => store.subscribeForm(cb);
    const snapshot = () => {
      if (!selector) return store.getStore();
      if (Array.isArray(selector)) return selector.map(n => store.getValue(n));
      return store.getValue(selector);
    };
    return useSyncExternalStore(subscribe, snapshot, snapshot);
  };

  const clearErrors = (names?: NamePath | NamePath[]) => store.clearErrors(names);
  const setError = (name: NamePath, msgs: string | string[]) =>
    store.setError(name, Array.isArray(msgs) ? msgs : [msgs]);

  return {
    clearErrors,
    form,
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
    watch // 也把 AntD 风格实例暴露出去
  };
};

/** ============== Controller：可控组件桥接（类似 RHF） ============== */
export const Controller: React.FC<{
  defaultValue?: any;
  deps?: NamePath[];
  name: NamePath;
  render: (props: {
    field: { name: string; onBlur: () => void; onChange: (v: any) => void; ref: (el: any) => void; value: any };
    fieldState: { error?: string; isDirty: boolean; isTouched: boolean; isValidating: boolean };
  }) => React.ReactElement | null;
  rules?: Rule[];
  validateTrigger?: string | string[];
}> = ({ defaultValue, deps, name, render, rules, validateTrigger }) => {
  const { form, register } = useHybridForm();
  const key = toPath(name).join('.');
  const fieldReg = useMemo(
    () => register(name, { defaultValue, deps, rules, validateTrigger }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, JSON.stringify({ defaultValue, deps, rules, validateTrigger })]
  );

  const subscribe = (cb: () => void) => form.__store.subscribeForm(cb);
  const snapshot = () => ({
    dirty: form.__store.isDirty(name),
    errors: form.getFieldError(name),
    touched: form.isFieldTouched(name),
    validating: form.isFieldsValidating([name]),
    value: form.getFieldValue(name)
  });
  const state = useSyncExternalStore(subscribe, snapshot, snapshot);

  return render({
    field: {
      name: key,
      onBlur: () => {
        form.__store.touched[key] = true;
        form.__store.bus.next({ name: toPath(key), type: 'touch' });
      },
      onChange: (v: any) => form.setFieldValue(name, v, { shouldDirty: true }),
      ref: fieldReg.ref,
      value: state.value
    },
    fieldState: {
      error: state.errors?.[0],
      isDirty: Boolean(state.dirty),
      isTouched: Boolean(state.touched),
      isValidating: Boolean(state.validating)
    }
  });
};
