/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-bitwise */

import { assign, isArray, isEqual, isNil, toArray } from 'skyroc-utils';

import { DepGraph } from './form-core/dependencies';
import { type ChangeMask, ChangeTag } from './form-core/event';
import { type Action, type Middleware, compose } from './form-core/middleware';
import type { ValidateMessages } from './form-core/types';
import type { Rule, ValidateOptions } from './form-core/validation';
import { runRulesWithMode } from './form-core/validation';
import type { FieldEntity } from './types/field';
import type { Callbacks, Store, StoreValue } from './types/formStore';
import NameMap from './utils/NameMap';
import { get } from './utils/get';
import { set } from './utils/set';
import type { NamePath, PathTuple } from './utils/util';
import { anyOn, isOn, keyOfName, microtask } from './utils/util';

type Listener = {
  cb: (value: StoreValue, key: string, all: Store, fired: ChangeMask) => void;
  mask: ChangeMask;
};

const matchTrigger = (rule: Rule, trig?: string | string[]) => {
  const list = toArray(rule.validateTrigger);

  if (!list.length) return true;

  const trigList = toArray(trig);

  return trigList.some(t => list.includes(t));
};

class FormStore {
  // ------------------------------------------------
  // Fields (State & registries)
  // ------------------------------------------------
  private _store: Store = {};
  private _initial: Store = {};
  private _fieldEntities: FieldEntity[] = [];

  private _callbacks: Callbacks = {};
  private _validateMessages: ValidateMessages = {};

  // Status area (exists if true)
  private _touched = new Set<string>();
  private _dirty = new Set<string>();
  private _validating = new Set<string>();

  private _errors = new Map<string, string[]>();
  private _warnings = new Map<string, string[]>();
  private _rules = new Map<string, Rule[]>();

  // Concurrent verification / Debouncing
  private _validateToken = new Map<string, number>();
  private _debounceTimer = new Map<string, any>();

  // Subscription (exact + prefix)
  private _exactListeners = new Map<string, Set<Listener>>();
  private _prefixListeners = new Map<string, Set<Listener>>();

  // Batch processing
  private _pending = new Map<string, ChangeMask>();
  private _flushScheduled = false;

  // Dependency graph (for external use / future extension)
  private _deps = new DepGraph();

  // Transactions
  private _txDepth = 0;
  private _txPending = new Map<string, ChangeMask>();

  // middleware
  private _middlewares: Middleware[] = [];

  // Computed registry
  private _computed = new Map<
    string,
    {
      // JSON keys
      compute: (get: (k: string) => any, all: Store) => any;
      deps: string[];
    }
  >();
  private _depIndex = new Map<string, Set<string>>(); // depKey -> set of computed target keys
  private _recomputeQueue = new Set<string>(); // reserved (not used in this refactor)

  // Visibility control
  private _disabledKeys = new Set<string>();
  private _hiddenKeys = new Set<string>();

  // Pre-submit transforms
  private _preSubmit: Array<(values: Store) => Store> = []; // Before submission transform pipeline

  // Preserve
  private _preserve = false;
  /**
   * Record prev Form unmount fieldEntities which config preserve false.
   * This need to be refill with initialValues instead of store value.
   */
  private _prevWithoutPreserves: NameMap<boolean> | null = null;

  constructor() {
    this.rebindMiddlewares();
  }

  // ------------------------------------------------
  // Config & Callbacks
  // ------------------------------------------------
  private isMergedPreserve = (fieldPreserve?: boolean) => {
    const mergedPreserve = fieldPreserve || this._preserve;
    return mergedPreserve || true;
  };

  private setCallbacks = (c: Callbacks) => {
    this._callbacks = c || {};
  };

  private setValidateMessages = (m: ValidateMessages) => {
    this._validateMessages = m || {};
  };

  private setPreserve = (preserve: boolean) => {
    this._preserve = preserve;
  };

  // ------------------------------------------------
  // Middleware / Dispatch
  // ------------------------------------------------
  private use = (mw: Middleware) => {
    this._middlewares.push(mw);
    this.rebindMiddlewares();
  };

  private rebindMiddlewares = () => {
    const api = { dispatch: (a: Action) => this.dispatch(a), getState: () => this._store };

    const chain = this._middlewares.map(m => m(api));

    this.dispatch = compose(...chain)(this.baseDispatch);
  };

  //  ===== dispatch =====
  private baseDispatch = (a: Action) => {
    switch (a.type) {
      case 'updateValue':
        this.updateValue(a.name, a.value);
        break;
      case 'setFieldsValue':
        this.setFieldsValue(a.values);
        break;
      case 'reset':
        this.resetFields(...(a.names || []));
        break;
      case 'validateField':
        this.validateField(a.name, a.opts);
        break;
      case 'setRules':
        this.setFieldRules(a.name, a.rules);
        break;
      case 'arrayOp':
        this.arrayOp(a.name, a.op, a.args);
        break;
      case 'setExternalErrors': {
        // payload: { entries: Array<[jsonKey: string, errors: string[]]> }
        const { entries } = a as any;
        const changed: string[] = [];
        this.begin();

        entries.forEach(([k, errs]: [string, string[]]) => {
          if (errs && errs.length) this._errors.set(k, errs);
          else this._errors.delete(k);
          changed.push(k);
        });
        if (changed.length) this.enqueueNotify(changed, ChangeTag.Errors);
        this.commit();
        break;
      }
      default:
        // Currently we don't have other action. Do nothing.
        break;
    }
  };

  private dispatch = (a: Action) => {
    const ctx = { dispatch: (x: Action) => this.dispatch(x), getState: () => this._store };
    const chain = this._middlewares.map(mw => mw(ctx));
    const reduced = chain.reduceRight((next, mw) => mw(next), this.baseDispatch);
    reduced(a);
  };

  // ------------------------------------------------
  // Store & Initial Values
  // ------------------------------------------------
  private updateStore = (nextStore: Store) => {
    this._store = nextStore;
  };

  private setInitialValues = (values: Store) => {
    this._initial = values;

    this.updateStore(values);

    let nextStore = assign(this._initial, this._store);

    // We will take consider prev form unmount fields.
    // When the field is not `preserve`, we need fill this with initialValues instead of store.
    // eslint-disable-next-line array-callback-return
    this._prevWithoutPreserves?.map(({ key: namePath }) => {
      nextStore = set(nextStore, namePath, get(this._initial, namePath));
    });

    this._prevWithoutPreserves = null;

    this.updateStore(nextStore);
  };

  private getFormState() {
    return {
      errors: Object.fromEntries(this._errors),
      initialValues: this._initial,
      isDirty: this._dirty.size > 0,
      isValid: Array.from(this._errors.values()).every(arr => !arr?.length),
      isValidating: this._validating.size > 0,
      values: this._store,
      warnings: Object.fromEntries(this._warnings)
    };
  }

  private getInitialValues = (...namePath: NonNullable<NamePath>[]) => {
    if (namePath.length === 0) {
      return this._initial;
    }

    return namePath.reduce((acc, name) => {
      acc[name as string] = get(this._initial, name);

      return acc;
    }, {} as Store);
  };

  private getInitialValue = (name: NamePath) => {
    return get(this._initial, keyOfName(name));
  };

  private resetFields = (...names: NonNullable<NamePath>[]) => {
    if (names.length === 0) {
      this.updateStore(this._initial);
      this._touched.clear();
      this._dirty.clear();
      this._errors.clear();
      this._warnings.clear();
      this._validating.clear();
      this.enqueueNotify();
      return;
    }

    const keys: string[] = [];
    for (const n of names) {
      const key = keyOfName(n);

      const initV = get(this._initial, key);
      this.updateStore(set(this._store, key, initV));

      this._touched.delete(key);
      this._dirty.delete(key);
      this._errors.delete(key);
      this._warnings.delete(key);
      this._validating.delete(key);
      keys.push(key);
    }
    this.enqueueNotify(keys);
  };

  // ------------------------------------------------
  // Field Registration & Visibility
  // ------------------------------------------------

  private registerField = (entity: FieldEntity) => {
    const name = keyOfName(entity.name);

    this._fieldEntities.push({
      ...entity,
      name
    });

    const initialValue = this.getInitialValue(name);

    if (isNil(initialValue)) {
      this.updateStore(set(this._store, name, entity.initialValue));

      this._initial = set(this._initial, name, entity.initialValue);
    }

    this._exactListeners.set(name, new Set([{ cb: entity.changeValue, mask: ChangeTag.Value }]));

    return () => {
      this._fieldEntities = this._fieldEntities.filter(e => e.name !== name);
      this._exactListeners.delete(name);
      this._prefixListeners.delete(name);
    };
  };

  private setDisabled = (name: NamePath, disabled: boolean) => {
    const k = keyOfName(name);
    disabled ? this._disabledKeys.add(k) : this._disabledKeys.delete(k);
  };

  private setHidden = (name: NamePath, hidden: boolean) => {
    const k = keyOfName(name);
    hidden ? this._hiddenKeys.add(k) : this._hiddenKeys.delete(k);
  };

  private isDisabled = (name: NamePath) => {
    return this._disabledKeys.has(keyOfName(name));
  };

  private isHidden = (name: NamePath) => {
    return this._hiddenKeys.has(keyOfName(name));
  };

  // ========== 新增：Computed API ==========
  /** 注册 computed 字段 */
  private registerComputed(name: NamePath, deps: NamePath[], compute: (get: (n: NamePath) => any, all: Store) => any) {
    const tgt = keyOfName(name);
    const depKeys = deps.map(keyOfName);
    this._computed.set(tgt, {
      compute: (getKey, all) => compute(n => getKey(keyOfName(n)), all),
      deps: depKeys
    });
    // 反向索引
    depKeys.forEach(d => {
      if (!this._depIndex.has(d)) this._depIndex.set(d, new Set());
      this._depIndex.get(d)!.add(tgt);
    });

    this.transaction(() => {
      this.recomputeTargets([tgt]);
    });

    return () => {
      this._computed.delete(tgt);
      depKeys.forEach(d => this._depIndex.get(d)?.delete(tgt));
    };
  }

  /** 由源变更触达：找出受影响的 computed 目标 */
  private collectDependents(changedKeys: string[]): string[] {
    const out = new Set<string>();
    const q = [...changedKeys];
    while (q.length) {
      const k = q.shift()!;
      const deps = this._depIndex.get(k);
      if (!deps) continue;
      for (const t of deps) {
        if (!out.has(t)) {
          out.add(t);
          // computed 也可能是别人的依赖，继续向外扩散
          q.push(t);
        }
      }
    }
    return Array.from(out);
  }

  /** 拓扑/迭代式重算（自动事务合并一次通知） */
  private recomputeTargets(targetKeys: string[]) {
    if (!targetKeys.length) return;
    const getKey = (k: string) => get(this._store, keyOfName(k));
    const topo: string[] = [];
    // 简单 Kahn：按 deps 层级推进，避免环导致死循环（有环则最多跑 N 轮）
    const seen = new Set<string>();
    const maxRounds = Math.max(1, this._computed.size);
    let rounds = 0;
    let frontier = new Set(targetKeys);
    while (frontier.size && rounds < maxRounds) {
      const next = new Set<string>();
      for (const k of frontier) {
        if (seen.has(k)) continue;
        const def = this._computed.get(k);
        if (!def) continue;
        // 如果其依赖也在目标集合里，等下一轮
        // eslint-disable-next-line no-loop-func
        const depsInFrontier = def.deps.some(d => frontier.has(d) && d !== k);

        if (depsInFrontier) {
          next.add(k);
          continue;
        }
        topo.push(k);
        seen.add(k);
      }
      // 还没处理完的进入下一轮
      for (const k of frontier) if (!seen.has(k)) next.add(k);
      frontier = next;
      rounds += 1;
    }
    // 执行：用事务合并为一次 flush
    this.transaction(() => {
      for (const k of topo) {
        const def = this._computed.get(k);
        if (!def) continue;
        const nextVal = def.compute(getKey, this._store);
        const prevVal = getKey(k);
        if (!isEqual(prevVal, nextVal)) {
          this.updateValue(keyOfName(k), nextVal, { markTouched: false }); // 不标记 touched
        }
      }
    });
  }

  // ------------------------------------------------
  // Values API (get/set)
  // ------------------------------------------------
  private getFieldValue = (name: NamePath) => get(this._store, name);

  private getFieldsValue = (...names: NamePath[]) => {
    if (names.length === 0) return this._store;

    return names.reduce((acc, n) => {
      acc[keyOfName(n)] = get(this._store, n);
      return acc;
    }, {} as Store);
  };

  private setFieldsValue = (values: Store) => {
    if (!values) return;
    // Merge & record which keys have changed
    this.transaction(() => {
      const changedKeys: string[] = [];

      const walk = (obj: any, prefix: string[] = []) => {
        Object.keys(obj || {}).forEach(k => {
          const path = [...prefix, k];

          changedKeys.push(keyOfName(path));

          const v = obj[k];

          if (v && isArray(v)) {
            v.forEach((item, i) => {
              walk(item, [...path, String(i)]);
            });
          } else if (v && typeof v === 'object') {
            walk(v, path);
          }
        });
      };

      walk(values);

      this.updateStore(assign(this._store, values));

      for (const k of changedKeys) {
        this._errors.delete(k);
        this._warnings.delete(k);
      }

      this.enqueueNotify(changedKeys, ChangeTag.Value | ChangeTag.Errors | ChangeTag.Warnings);

      this._callbacks.onValuesChange?.(values, this._store);

      this.triggerOnFieldsChange(changedKeys);

      const affected2 = this.collectDependents(changedKeys); // changed 是 JSON key 列表

      this.recomputeTargets(affected2);
    });
  };

  private setFieldValue = (name: NamePath, value: StoreValue) => {
    this.dispatch({ name, type: 'updateValue', value });
  };

  private updateValue = (name: NamePath, value: StoreValue, { markTouched = true } = {}) => {
    const key = keyOfName(name);

    const before = get(this._store, key);

    if (isEqual(before, value)) return; // value not changed, do not trigger

    this.updateStore(set(this._store, name, value));

    // touched
    let mask = ChangeTag.Value;

    if (markTouched) {
      this._touched.add(key);
      mask |= ChangeTag.Touched;
    }

    // dirty: compare with initial
    const initV = this.getInitialValue(key);

    isEqual(value, initV) ? this._dirty.delete(key) : this._dirty.add(key);

    mask |= ChangeTag.Dirty;

    this.enqueueNotify([name], mask);

    // callback
    this._callbacks.onValuesChange?.(set({}, key, value), this._store);

    this.triggerOnFieldsChange([key]);

    const affected = this.collectDependents([key]);

    this.recomputeTargets(affected);
  };

  // ------------------------------------------------
  // Fields State (errors/touched/validating/warnings, selectors)
  // ------------------------------------------------
  private getFields = () => {
    return this._fieldEntities.map(entity => this.getField(entity.name));
  };

  private getField = (name: NamePath) => {
    const key = keyOfName(name);

    return {
      errors: this.getFieldError(key) || [],
      name: keyOfName(name),
      touched: this.isFieldTouched(name),
      validated: this._validating.has(key),
      validating: this.isFieldValidating(key),
      value: this.getFieldValue(key),
      warnings: this.getFieldWarning(key) || []
    };
  };

  // ===== FieldError =====
  private getFieldError = (name: NamePath) => {
    return this._errors.get(keyOfName(name)) || [];
  };

  private getFieldsError = (...nameList: NamePath[]) => {
    if (nameList.length === 0) {
      return Object.fromEntries(this._errors);
    }

    const nameListArray = toArray(nameList);

    return nameListArray.reduce(
      (acc, name) => {
        const key = keyOfName(name);
        acc[key] = this._errors.get(key) || [];

        return acc;
      },
      {} as Record<string, string[]>
    );
  };

  // ===== FieldWarning =====
  private getFieldWarning = (name: NamePath) => {
    return this._warnings.get(keyOfName(name)) || [];
  };

  private getFieldsWarning = (...nameList: NonNullable<NamePath>[]) => {
    if (nameList.length === 0) {
      return Object.fromEntries(this._warnings);
    }

    return nameList.reduce(
      (acc, name) => {
        acc[name as string] = this._warnings.get(keyOfName(name)) || [];

        return acc;
      },
      {} as Record<string, string[]>
    );
  };

  // ===== FieldValidating =====
  private isFieldsValidating = (...nameList: NonNullable<NamePath>[]) => {
    if (nameList.length === 0) {
      return this._validating.size > 0;
    }

    return anyOn(this._validating, nameList);
  };

  private isFieldValidating = (name: NamePath) => {
    return isOn(this._validating, name);
  };

  // ===== FieldTouched =====
  private isFieldsTouched = (...nameList: NonNullable<NamePath>[]) => {
    if (nameList.length === 0) {
      return this._touched.size > 0;
    }
    return anyOn(this._touched, nameList);
  };

  private isFieldTouched = (name: NamePath) => {
    return isOn(this._touched, name);
  };

  // ===== Rules =====
  private setFieldRules = (name: NamePath, rules?: Rule[]) => {
    if (!rules) return;

    this._rules.set(keyOfName(name), rules);
  };

  private validateField = async (name: NamePath, opts?: ValidateOptions): Promise<boolean> => {
    const key = keyOfName(name);

    const allRules = this._rules.get(key) || [];
    const rules = opts?.trigger ? allRules.filter(r => matchTrigger(r, opts?.trigger)) : allRules;
    if (rules.length === 0) {
      this._errors.delete(key);
      this._warnings.delete(key);
      this.enqueueNotify([key], ChangeTag.Errors | ChangeTag.Warnings);
      this.triggerOnFieldsChange([key]);
      return true;
    }

    // 取最小防抖
    const msList = rules.map(r => r?.debounceMs ?? Infinity);
    const debounceMs = Math.min(...msList) === Infinity ? 160 : Math.min(...msList);

    const prevTimer = this._debounceTimer.get(key);
    if (prevTimer) clearTimeout(prevTimer);

    const run = async (): Promise<boolean> => {
      const token = (this._validateToken.get(key) || 0) + 1;
      this._validateToken.set(key, token);

      this._validating.add(key);

      this.enqueueNotify([key], ChangeTag.Validating);

      const value = this.getFieldValue(key);

      const { errors, warns } = await runRulesWithMode(value, rules, opts?.mode || 'parallelAll');

      // 并发淘汰：如果 token 改变，放弃落盘
      if (this._validateToken.get(key) !== token) return false;

      // === 对比新旧，只有变化才落盘 & 通知 ===
      const prevErrors = this._errors.get(key) || [];
      const prevWarns = this._warnings.get(key) || [];

      const errorsChanged = !isEqual(prevErrors, errors);
      const warnsChanged = !isEqual(prevWarns, warns);

      if (errorsChanged) {
        errors.length ? this._errors.set(key, errors) : this._errors.delete(key);
      }
      if (warnsChanged) {
        warns.length ? this._warnings.set(key, warns) : this._warnings.delete(key);
      }

      this._validating.delete(key);

      // 只在对应位变化时，才把位并进掩码
      let mask: ChangeMask = ChangeTag.Validated;
      if (errorsChanged) mask |= ChangeTag.Errors;
      if (warnsChanged) mask |= ChangeTag.Warnings;

      this.enqueueNotify([key], mask);

      // 是否需要始终回调由你的业务决定；如也想避免无变化触发，可加条件判断
      this.triggerOnFieldsChange([key]);

      return errors.length === 0;
    };

    return await new Promise<boolean>(resolve => {
      if (debounceMs > 0) {
        const t = setTimeout(async () => resolve(await run()), debounceMs);
        this._debounceTimer.set(key, t);
      } else {
        run().then(resolve);
      }
    });
  };

  async validateFields(names?: NamePath[], opts?: ValidateOptions) {
    const list = names?.length ? names : Array.from(this._dirty);
    if (!list.length) return true;

    this.transaction(() => {
      for (const n of list) {
        const k = keyOfName(n);
        if (!this._validating.has(k)) {
          this._validating.add(k);
          this.enqueueNotify([k], ChangeTag.Validating);
        }
      }
    });

    const ok = await Promise.all(list.map(n => this.validateField(n, opts)));

    return ok.every(Boolean);
  }

  // ------------------------------------------------
  // Transactions (begin/commit/rollback)
  // ------------------------------------------------

  private begin() {
    this._txDepth += 1;
  }

  private commit() {
    if (this._txDepth === 0) return;

    this._txDepth -= 1;

    if (this._txDepth === 0 && this._txPending.size) {
      const snap = Array.from(this._txPending.entries());
      this._txPending.clear();
      // eslint-disable-next-line no-bitwise
      for (const [k, mask] of snap) this._pending.set(k, (this._pending.get(k) || 0) | mask);

      this.scheduleFlush();
    }
  }

  private rollback() {
    this._txPending.clear();
    this._txDepth = 0;
  }

  private transaction<T>(fn: () => T): T {
    this.begin();
    try {
      return fn();
    } finally {
      this.commit();
    }
  }

  // ===== Array Operation =====
  private arrayOp(name: NamePath, op: 'insert' | 'move' | 'remove' | 'replace' | 'swap', args: any) {
    const arr = this.getFieldValue(name);
    if (!Array.isArray(arr)) return;
    const next = arr.slice();
    const ak = keyOfName(name);
    const affected3 = this.collectDependents([ak]);
    this.recomputeTargets(affected3);
    const mark = (mask: ChangeMask = ChangeTag.Value) => this.enqueueNotify([name], mask);
    switch (op) {
      case 'insert': {
        const { index, item } = args;
        next.splice(index, 0, item);
        this._store = set(this._store, name, next);
        mark();
        break;
      }
      case 'remove': {
        const { index } = args;
        next.splice(index, 1);
        this._store = set(this._store, name, next);
        mark();
        break;
      }
      case 'move': {
        const { from, to } = args;
        const [x] = next.splice(from, 1);
        next.splice(to, 0, x);
        this._store = set(this._store, name, next);
        mark();
        break;
      }
      case 'swap': {
        const { i, j } = args;
        const tmp = next[i];
        next[i] = next[j];
        next[j] = tmp;
        this._store = set(this._store, name, next);
        mark();
        break;
      }
      case 'replace': {
        const { index, item } = args;
        next[index] = item;
        this._store = set(this._store, name, next);
        mark();
        break;
      }
      default:
        break;
    }
  }

  // ===== FieldChange =====
  triggerOnFieldsChange = (nameList: NamePath[]) => {
    if (this._callbacks?.onFieldsChange) {
      const fields = this.getFields();

      const changedFields = fields.filter(field => {
        return nameList.includes(field.name);
      });

      this._callbacks?.onFieldsChange?.(changedFields, fields);
    }
  };

  // ===== Submit =====

  usePreSubmit(fn: (values: Store) => Store) {
    this._preSubmit.push(fn);
  }

  private _pruneForSubmit(values: Store): Store {
    const disabled = Array.from(this._disabledKeys);
    const hidden = Array.from(this._hiddenKeys);
    const blocked = (k: string) => disabled.some(d => k.startsWith(d)) || hidden.some(h => k.startsWith(h));
    const walk = (node: any, prefix: PathTuple = []): any => {
      const k = keyOfName(prefix);
      if (blocked(k)) return undefined;
      if (Array.isArray(node)) {
        const out = node.map((it, i) => walk(it, [...prefix, String(i)])).filter(v => v !== undefined);
        return out;
      }
      if (node && typeof node === 'object') {
        const out: any = {};
        Object.keys(node).forEach(key => {
          const v = walk(node[key], [...prefix, key]);
          if (v !== undefined) out[key] = v;
        });
        return out;
      }
      return node;
    };
    return walk(values, []) ?? {};
  }

  private buildFailedPayload() {
    const errorMap = Object.fromEntries(this._errors);
    const warningMap = Object.fromEntries(this._warnings);

    const errorFields = Array.from(this._errors.entries()).map(([name, errors]) => ({
      errors,
      name,
      touched: this._touched.has(name),
      validating: this._validating.has(name),
      value: this.getFieldValue(name),
      warnings: this._warnings.get(name) || []
    }));

    // 注意：Map 的迭代顺序是插入顺序；如果你想“第一个错误字段”根据 DOM 顺序，
    // 可以在这里按你的字段注册顺序（_fieldEntities）排序一次。
    const firstErrorName = errorFields[0]?.name;

    return {
      errorCount: errorFields.length,
      errorFields,
      errorMap,
      firstErrorName,
      submittedAt: Date.now(),
      values: this._store,
      warningMap
    };
  }
  private submit = () => {
    this.validateFields().then(ok => {
      console.log('submit', ok);
      if (ok) this._callbacks.onFinish?.(this._store);
      else this._callbacks.onFinishFailed?.(this.buildFailedPayload());
    });
  };

  private destroyForm = (clearOnDestroy?: boolean) => {
    if (clearOnDestroy) {
      // destroy form reset store
      this.updateStore({});
    } else {
      // Fill preserve fields
      const prevWithoutPreserves = new NameMap<boolean>();

      this._fieldEntities.forEach(entity => {
        if (!this.isMergedPreserve(entity.preserve)) {
          prevWithoutPreserves.set(entity.name as PathTuple, true);
        }
      });

      this._prevWithoutPreserves = prevWithoutPreserves;
    }

    this._touched.clear();
    this._dirty.clear();
    this._errors.clear();
    this._warnings.clear();
    this._validating.clear();
    this._exactListeners.clear();
    this._prefixListeners.clear();
    this._pending.clear();
    this._txPending.clear();
    this._txDepth = 0;
  };

  // ===== Batch processing notification =====

  private subscribeField = (
    name: NamePath,
    cb: Listener['cb'],
    opt?: { includeChildren?: boolean; mask?: ChangeMask }
  ) => {
    const key = keyOfName(name);

    const bucket = opt?.includeChildren ? this._prefixListeners : this._exactListeners;

    let listeners = bucket.get(key);

    if (!listeners) {
      listeners = new Set();
      bucket.set(key, listeners);
    }

    const listener: Listener = { cb, mask: opt?.mask ?? ChangeTag.All };

    listeners.add(listener);

    let done = false;
    return () => {
      if (done) return;
      done = true;
      const s = bucket.get(key);
      s?.delete(listener);
      if (s && s.size === 0) bucket.delete(key);
    };
  };

  // --- Private: Actually notify (merge triggers in a single microtask)

  private markPending(key: string, mask: ChangeMask) {
    if (this._txDepth > 0) {
      this._txPending.set(key, (this._txPending.get(key) ?? 0) | mask);
    } else {
      this._pending.set(key, (this._pending.get(key) ?? 0) | mask);
    }
  }

  private enqueueNotify(names?: NamePath[] | string[], mask: ChangeMask = ChangeTag.All) {
    if (!names) this.markPending('*', ChangeTag.All);
    else for (const n of names) this.markPending(keyOfName(n), mask);

    this.scheduleFlush();
  }

  private scheduleFlush() {
    if (this._txDepth > 0) return; // During the transaction, do not flush; wait for commit.

    if (!this._flushScheduled) {
      this._flushScheduled = true;

      microtask(() => this.flushNotify());
    }
  }

  private flushNotify() {
    this._flushScheduled = false;

    if (this._pending.size === 0) return;

    const snapshot = Array.from(this._pending.entries());

    this._pending.clear();

    const fire = (key: string, mask: ChangeMask, listeners?: Set<Listener>) => {
      listeners?.forEach(({ cb, mask: m }) => {
        if ((m & mask) !== 0) cb(this.getFieldValue(key), key, this._store, mask);
      });
    };

    if (snapshot.some(([k]) => k === '*')) {
      for (const [k, listeners] of this._exactListeners) fire(k, ChangeTag.All, listeners);
      for (const [k, listeners] of this._prefixListeners) fire(k, ChangeTag.All, listeners);
      return;
    }

    for (const [k, mask] of snapshot) fire(k, mask, this._exactListeners.get(k));

    for (const [prefixKey, listeners] of this._prefixListeners) {
      let aggMask = 0;

      for (const [k, mk] of snapshot) {
        if (k.startsWith(prefixKey)) aggMask |= mk; // ← 只聚合命中的 key 的掩码
      }

      if (aggMask) fire(prefixKey, aggMask, listeners);
    }
  }

  getForm = () => {
    return {
      getField: this.getField,
      getFieldError: this.getFieldError,
      getFields: this.getFields,
      getFieldsError: this.getFieldsError,
      getFieldsValue: this.getFieldsValue,
      getFieldsWarning: this.getFieldsWarning,
      getFieldValue: this.getFieldValue,
      getFieldWarning: this.getFieldWarning,
      getFormState: this.getFormState,
      getInternalHooks: this.getInternalHooks,
      isFieldsTouched: this.isFieldsTouched,
      isFieldsValidating: this.isFieldsValidating,
      isFieldTouched: this.isFieldTouched,
      isFieldValidating: this.isFieldValidating,
      resetFields: this.resetFields,
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      setInitialValues: this.setInitialValues,
      submit: this.submit,
      subscribeField: this.subscribeField,
      use: this.use,
      validateField: this.validateField,
      validateFields: this.validateFields
    };
  };

  getInternalHooks = () => {
    return {
      destroyForm: this.destroyForm,
      dispatch: this.dispatch,
      getFields: this.getFields,
      getInitialValue: this.getInitialValue,
      registerField: this.registerField,
      setCallbacks: this.setCallbacks,
      setInitialValues: this.setInitialValues,
      setPreserve: this.setPreserve,
      setValidateMessages: this.setValidateMessages
    };
  };
}

export default FormStore;
