import type {
  FieldMeta,
  FieldState,
  FormState,
  NamePath,
  Options,
  RegisterOptions,
  ResetFieldOptions,
  ResetOptions,
  SetValueOptions,
  Store,
  Unsubscribe,
  ValidateOptions,
  WatchCallback
} from './types';

export function createFormStore(opts: Options = {}): Control {
  const options: Options = {
    mode: 'onSubmit',
    preserve: true,
    reValidateMode: 'onChange',
    shouldUnregister: false,
    ...opts
  };

  const formState: FormState = {
    dirtyFields: {},
    disabled: false,
    errors: {},
    isDirty: false,
    isSubmitSuccessful: false,
    isSubmitted: false,
    isSubmitting: false,
    isValid: false,
    isValidating: false,
    submitCount: 0,
    touchedFields: {},
    validatingFields: {}
  };

  const fields = new Map<string, FieldState>();
  const dependencies = new Map<string, Set<string>>();

  const stateSub = new Subject<Partial<FormState> & { name?: string; type?: any; values?: Store }>();
  const watchers = new Set<WatchCallback>();
  const batcher = createBatcher();

  const ensureField = (name: InternalNamePath) => {
    const key = pathKey(name);
    if (!fields.has(key))
      fields.set(key, { dirty: false, errors: [], name, touched: false, validating: false, warnings: [] });
    return fields.get(key)!;
  };

  const notify = (payload: Partial<FormState> & { name?: string; type?: any; values?: Store }) => {
    stateSub.next(payload);
  };

  const notifyWatch = (namePaths: InternalNamePath[]) => {
    if (watchers.size === 0) return;
    const v = getValues(true);
    watchers.forEach(cb => cb(v, v, namePaths));
  };

  const recalcIsDirty = () => {
    formState.dirtyFields = getDirtyFields(defaults, values);
    const hasDirty = Object.keys(formState.dirtyFields).length > 0;
    if (formState.isDirty !== hasDirty) formState.isDirty = hasDirty;
  };

  const setTouched = (name: InternalNamePath, touched = true) => {
    const key = pathKey(name);
    ensureField(name).touched = touched;
    formState.touchedFields[key] = touched;
  };

  const setDirtyFlagFor = (name: InternalNamePath) => {
    const key = pathKey(name);
    const isDirty = !deepEqual(get(values, name, undefined), get(defaults, name, undefined));
    ensureField(name).dirty = isDirty;
    if (isDirty) formState.dirtyFields[key] = true;
    else formState.dirtyFields = omitKey(formState.dirtyFields, key);
    recalcIsDirty();
  };

  const setErrorFor = (name: InternalNamePath, msg?: string) => {
    const key = pathKey(name);
    if (msg) formState.errors[key] = msg;
    else formState.errors = omitKey(formState.errors, key);
  };

  const runResolver = async () => {
    if (!options.resolver) return { errors: {} as Record<string, string[]>, values: clone(values) };
    return options.resolver(clone(values));
  };

  const validateByNameList = async (names?: InternalNamePath[], vo: ValidateOptions = {}) => {
    const list = names && names.length ? names : Array.from(fields.values()).map(f => f.name);

    if (options.resolver) {
      formState.isValidating = true;
      notify({ isValidating: true, type: 'validate' });
      const { errors } = await runResolver();
      formState.errors = {};
      for (const [k, arr] of Object.entries(errors)) {
        const msg = Array.isArray(arr) ? arr[0] : (arr as any);
        formState.errors[k] = msg;
      }
      formState.isValidating = false;
      formState.isValid = Object.keys(formState.errors).length === 0;
      notify({ isValid: formState.isValid, isValidating: false, type: 'validate' });
      return formState.errors;
    }

    formState.isValidating = true;
    notify({ isValidating: true, type: 'validate' });
    const newErrors: Record<string, string | undefined> = {};
    for (const name of list) {
      const key = pathKey(name);
      const fs = ensureField(name);
      if (vo.dirty && !fs.dirty) continue;
      fs.validating = true;
      formState.validatingFields[key] = true;
      const errs = await validateByRules(fs.rules, get(values, name, undefined), values);
      fs.validating = false;
      formState.validatingFields = omitKey(formState.validatingFields, key);
      newErrors[key] = errs?.[0];
    }

    formState.errors = {};
    for (const [k, msg] of Object.entries(newErrors)) {
      if (msg) formState.errors[k] = msg;
    }

    formState.isValidating = false;
    formState.isValid = Object.keys(formState.errors).length === 0;
    notify({ isValid: formState.isValid, isValidating: false, type: 'validate' });
    return formState.errors;
  };

  const triggerDependenciesUpdate = (root: InternalNamePath) => {
    const rootKey = pathKey(root);
    const children = dependencies.get(rootKey);
    if (!children || children.size === 0) return [] as InternalNamePath[];
    const namePaths: InternalNamePath[] = [];
    children.forEach(k => {
      const f = fields.get(k);
      if (f) namePaths.push(f.name);
    });
    validateByNameList(namePaths).catch(() => void 0);
    return namePaths;
  };

  const getArr = (name: InternalNamePath) => {
    const arr = get(values, name, []);
    if (!isArray(arr)) throw new Error(`[fieldArray] ${pathKey(name)} is not an array`);
    return arr as any[];
  };

  const setArr = (name: InternalNamePath, arr: any[]) => {
    values = set(values, name, arr);
    setDirtyFlagFor(name);
    notify({ name: pathKey(name), type: 'array', values: clone(values) });
  };

  const api: Control = {
    clearErrors(name) {
      if (!name) {
        formState.errors = {};
        notify({ type: 'validate' });
        return;
      }
      const arr = Array.isArray(name) ? name : [name];
      arr.forEach(n => {
        const k = pathKey(toPath(n));
        formState.errors = omitKey(formState.errors, k);
      });
      notify({ type: 'validate' });
    },

    fieldArray: {
      append(name, value) {
        const np = toPath(name);
        const arr = getArr(np);
        setArr(np, [...arr, value]);
      },
      insert(name, index, value) {
        const np = toPath(name);
        const arr = getArr(np).slice();
        arr.splice(index, 0, value);
        setArr(np, arr);
      },
      move(name, from, to) {
        const np = toPath(name);
        const arr = getArr(np).slice();
        const item = arr.splice(from, 1)[0];
        arr.splice(to, 0, item);
        setArr(np, arr);
      },
      prepend(name, value) {
        const np = toPath(name);
        const arr = getArr(np);
        setArr(np, [value, ...arr]);
      },
      remove(name, idx) {
        const np = toPath(name);
        const arr = getArr(np).slice();
        const indexes = Array.isArray(idx) ? [...idx].sort((a, b) => b - a) : [idx];
        const next = arr.slice();
        indexes.forEach(i => next.splice(i as number, 1));
        setArr(np, next);
      },
      swap(name, a, b) {
        const np = toPath(name);
        const arr = getArr(np).slice();
        [arr[a], arr[b]] = [arr[b], arr[a]];
        setArr(np, arr);
      },
      update(name, index, value) {
        const np = toPath(name);
        const arr = getArr(np).slice();
        arr[index] = value;
        setArr(np, arr);
      }
    },

    getFields() {
      return Array.from(fields.values()).map(f => ({ ...f, value: get(values, f.name, undefined) }));
    },

    getFormState() {
      return clone(formState);
    },

    getValue(name) {
      return get(values, toPath(name), undefined);
    },

    getValues(
      nameListOrTrue?: NamePath[] | true | { filter?: (meta: FieldMeta | null) => boolean; strict?: boolean },
      filter?: (meta: FieldMeta | null) => boolean
    ) {
      if (nameListOrTrue === true && !filter) return values;
      let nameList: InternalNamePath[] | undefined;
      let strict = false;
      let filt: ((meta: FieldMeta | null) => boolean) | undefined = filter;

      if (Array.isArray(nameListOrTrue)) nameList = nameListOrTrue.map(toPath);
      else if (nameListOrTrue && typeof nameListOrTrue === 'object') {
        strict = Boolean(nameListOrTrue.strict);
        filt = nameListOrTrue.filter;
      }

      const result: Store = {};
      const entries = Array.from(fields.values());
      let acc: Store = result;
      entries.forEach(f => {
        const meta: FieldMeta = {
          dirty: f.dirty,
          disabled: f.disabled,
          errors: f.errors,
          touched: f.touched,
          validating: f.validating,
          warnings: f.warnings
        };
        if (!nameList) {
          if (!f.isListField || !strict) acc = set(acc, f.name, get(values, f.name, undefined));
        } else {
          const hit = nameList.some(np => np.every((u, i) => f.name[i] === u));
          if (hit) acc = set(acc, f.name, get(values, f.name, undefined));
        }
        if (filt) {
          if (!filt(meta)) acc = unset(acc, f.name);
        }
      });
      return acc;
    },

    handleSubmit(onValid, onInvalid) {
      return async () => {
        formState.isSubmitting = true;
        notify({ isSubmitting: true });
        try {
          await api.validateFields();
          formState.isSubmitted = true;
          formState.submitCount += 1;
          formState.isSubmitSuccessful = true;
          notify({ isSubmitSuccessful: true, isSubmitted: true, isSubmitting: false });
          await onValid(clone(values));
        } catch (e: any) {
          formState.isSubmitted = true;
          formState.submitCount += 1;
          formState.isSubmitSuccessful = false;
          notify({ isSubmitSuccessful: false, isSubmitted: true, isSubmitting: false });
          onInvalid?.(clone(formState.errors));
        } finally {
          formState.isSubmitting = false;
        }
      };
    },

    register(name, optionsReg) {
      const np = toPath(name);
      const key = pathKey(np);
      const st = ensureField(np);

      if (optionsReg?.rules) st.rules = optionsReg.rules;
      if (optionsReg?.preserve != null) st.preserve = optionsReg.preserve;
      if (optionsReg?.isList != null) st.isList = optionsReg.isList;
      if (optionsReg?.isListField != null) st.isListField = optionsReg.isListField;

      if (optionsReg?.initialValue !== undefined) {
        const dv = get(defaults, np, undefined);
        if (dv !== undefined) {
          console.warn(`[form-core] Field initialValue for ${key} ignored because defaultValues already provide it.`);
        } else if (get(values, np, undefined) === undefined) {
          values = set(values, np, clone(optionsReg.initialValue));
        }
        st.initialValueProvided = true;
      }

      if (optionsReg?.deps) {
        optionsReg.deps.forEach(dep => {
          const dk = pathKey(toPath(dep));
          if (!dependencies.has(dk)) dependencies.set(dk, new Set());
          dependencies.get(dk)!.add(key);
        });
        st.deps = optionsReg.deps.map(toPath);
      }

      return () => api.unregister(np);
    },

    reset(nextValues, ro: ResetOptions = {}) {
      const keepValues = Boolean(ro.keepValues);
      const keepDefaults = Boolean(ro.keepDefaultValues);
      const isEmpty = nextValues && Object.keys(nextValues).length === 0;
      if (!keepDefaults) defaults = clone(nextValues ?? defaults);
      if (!keepValues) values = clone(isEmpty ? defaults : (nextValues ?? defaults));

      if (!ro.keepTouched) formState.touchedFields = {};
      if (!ro.keepDirty) formState.dirtyFields = {};
      if (!ro.keepErrors) formState.errors = {};
      if (!ro.keepIsSubmitted) formState.isSubmitted = false;
      if (!ro.keepIsValid) formState.isValid = true;
      if (!ro.keepSubmitCount) formState.submitCount = 0;

      recalcIsDirty();
      notify({ type: 'reset', values: clone(values) });
      notifyWatch([]);
    },

    resetField(name, rfo: ResetFieldOptions = {}) {
      const np = toPath(name);
      const key = pathKey(np);
      const dv = rfo.defaultValue !== undefined ? rfo.defaultValue : get(defaults, np, undefined);
      values = set(values, np, dv);
      if (!rfo.keepTouched) {
        formState.touchedFields = omitKey(formState.touchedFields, key);
        const f = fields.get(key);
        if (f) f.touched = false;
      }
      if (!rfo.keepDirty) {
        formState.dirtyFields = omitKey(formState.dirtyFields, key);
        const f = fields.get(key);
        if (f) f.dirty = false;
      }
      if (!rfo.keepError) {
        formState.errors = omitKey(formState.errors, key);
      }
      recalcIsDirty();
      notify({ name: key, type: 'reset', values: clone(values) });
      notifyWatch([np]);
    },

    setError(name, message) {
      setErrorFor(toPath(name), message);
      notify({ type: 'validate' });
    },

    setFields(fieldsPatch) {
      const changed: InternalNamePath[] = [];
      fieldsPatch.forEach(f => {
        const np = toPath(f.name);
        const key = pathKey(np);
        changed.push(np);
        if ('value' in f) values = set(values, np, f.value);
        const fs = ensureField(np);
        if ('errors' in f && f.errors) {
          fs.errors = f.errors;
          formState.errors[key] = f.errors[0];
        }
        if ('warnings' in f && f.warnings) fs.warnings = f.warnings;
        if ('touched' in f && f.touched != null) {
          fs.touched = Boolean(f.touched);
          formState.touchedFields[key] = Boolean(f.touched);
        }
      });
      recalcIsDirty();
      notify({ type: 'change', values: clone(values) });
      notifyWatch(changed);
    },

    setOptions(partial) {
      Object.assign(options, partial);
    },

    setValue(name, value, opts = {}) {
      const np = toPath(name);
      const key = pathKey(np);
      values = set(values, np, value);
      setTouched(np, Boolean(opts.shouldTouch) || options.mode === 'onBlur');
      setDirtyFlagFor(np);

      notify({ name: key, type: 'change', values: clone(values) });
      notifyWatch([np]);

      const children = triggerDependenciesUpdate(np);
      if (opts.shouldValidate || options.mode !== 'onSubmit') {
        validateByNameList([np, ...children]).catch(() => void 0);
      } else if (options.reValidateMode === 'onChange') {
        validateByNameList([np, ...children], { dirty: true }).catch(() => void 0);
      }
    },

    setValues(patch) {
      values = { ...values, ...clone(patch) };
      recalcIsDirty();
      notify({ type: 'change', values: clone(values) });
      notifyWatch([]);
    },

    subscribe(cb) {
      return stateSub.subscribe(cb);
    },

    async trigger(names) {
      const arr = names == null ? undefined : Array.isArray(names) ? names.map(toPath) : [toPath(names)];
      await validateByNameList(arr);
      const ok = Object.keys(formState.errors).length === 0;
      return ok;
    },

    unregister(name, opts = {}) {
      const np = toPath(name);
      const key = pathKey(np);
      const st = fields.get(key);
      if (!st) return;
      fields.delete(key);

      dependencies.forEach(s => s.delete(key));

      const preserve = st.preserve ?? options.preserve ?? true;
      if (options.shouldUnregister) {
        values = unset(values, np);
        defaults = unset(defaults, np);
      } else if (!preserve) {
        const dv = get(defaults, np, undefined);
        values = set(values, np, dv as any);
      }

      formState.errors = omitKey(formState.errors, key);
      formState.touchedFields = omitKey(formState.touchedFields, key);
      formState.validatingFields = omitKey(formState.validatingFields, key);
      formState.dirtyFields = omitKey(formState.dirtyFields, key);
      recalcIsDirty();

      notify({ name: key, type: 'change', values: clone(values) });
    },

    async validateFields(names, opts) {
      const arr = names == null ? undefined : Array.isArray(names) ? names.map(toPath) : [toPath(names)];
      await validateByNameList(arr, opts);
      if (Object.keys(formState.errors).length) {
        const err = new Error('ValidationError');
        (err as any).errors = clone(formState.errors);
        throw err;
      }
      return clone(values);
    },

    watch(cb) {
      watchers.add(cb);
      return () => watchers.delete(cb);
    }
  };

  return api;
}

/* =============================== quick test usage (注释示例) =============================== */
// const form = createFormStore({ defaultValues: { email: '', pwd: '' } });
// const unreg = form.register(['email'], { rules: [{ required: true, message: '必填' }, { pattern: /@/, message: '格式' }] });
// form.setValue(['email'], 'a@b.com', { shouldValidate: true });
// form.handleSubmit(async (v)=>console.log('ok', v), (e)=>console.log('bad', e))();
