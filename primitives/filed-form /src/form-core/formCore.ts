// FormStore.ts
import { assign, isArray, isEqual } from 'skyroc-utils';

import { DepGraph } from './dependencies';
import type { ChangeMask } from './events';
import { ChangeTag } from './events';
import type { Action, Middleware } from './middleware';
import { isPrefix, keyOfName, microtask, toArray, tupleOfKey } from './path';
import type { Callbacks, FieldEntity, Meta, NamePath, Rule, Store, StoreValue, ValidateMessages } from './types';
import { get } from './utils/get';
import { set } from './utils/set';
import { type RunMode, runRulesWithMode } from './validation';

type Listener = { cb: (value: StoreValue, key: string, all: Store, fired: ChangeMask) => void; mask: ChangeMask };

export class FormStore {
  private _store: Store = {};
  private _initial: Store = {};
  private _callbacks: Callbacks = {};
  private _validateMessages: ValidateMessages = {};

  private _touched = new Set<string>();
  private _dirty = new Set<string>();
  private _validating = new Set<string>();
  private _errors = new Map<string, string[]>();
  private _warnings = new Map<string, string[]>();
  private _rules = new Map<string, Rule[]>();

  private _validateToken = new Map<string, number>();
  private _debounceTimer = new Map<string, any>();

  private _exactListeners = new Map<string, Set<Listener>>();
  private _prefixListeners = new Map<string, Set<Listener>>();

  private _pending = new Map<string, ChangeMask>();
  private _flushScheduled = false;

  private _deps = new DepGraph();

  // 事务
  private _txDepth = 0;
  private _txPending = new Map<string, ChangeMask>();

  // 中间件
  private _middlewares: Middleware[] = [];

  // ===== 配置 =====
  setCallbacks = (c: Callbacks) => {
    this._callbacks = c || {};
  };
  setValidateMessages = (m: ValidateMessages) => {
    this._validateMessages = m || {};
  };

  use(mw: Middleware) {
    this._middlewares.push(mw);
  }

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
    }
  };

  dispatch = (a: Action) => {
    const ctx = { dispatch: (x: Action) => this.dispatch(x), getState: () => this._store };
    const chain = this._middlewares.map(mw => mw(ctx));
    const reduced = chain.reduceRight((next, mw) => mw(next), this.baseDispatch);
    reduced(a);
  };

  // ===== 值读写 =====
  getFieldValue = (n: NamePath) => get(this._store, n);
  getFieldsValue = (...names: NamePath[]) => {
    if (!names.length) return this._store;
    return names.reduce((acc, n) => ((acc[keyOfName(n)] = get(this._store, n)), acc), {} as Store);
  };
  setFieldValue = (n: NamePath, v: StoreValue) => this.dispatch({ name: n, type: 'updateValue', value: v });
  setFieldsValue = (values: Store) => {
    if (!values) return;
    const changed: string[] = [];
    const walk = (obj: any, prefix: string[] = []) => {
      Object.keys(obj || {}).forEach(k => {
        const path = [...prefix, k];
        changed.push(keyOfName(path));
        const v = obj[k];
        if (v && isArray(v)) v.forEach((it, i) => walk(it, [...path, String(i)]));
        else if (v && typeof v === 'object') walk(v, path);
      });
    };
    walk(values);

    // 写入
    this._store = assign(this._store, values);

    // 清理错误
    for (const k of changed) {
      this._errors.delete(k);
      this._warnings.delete(k);
    }

    this.enqueueNotify(changed, ChangeTag.Value | ChangeTag.Errors | ChangeTag.Warnings);
    this._callbacks.onValuesChange?.(values, this._store);
    this.triggerOnFieldsChange(changed.map(tupleOfKey));
  };

  setInitialValues = (values: Store) => {
    this._initial = values || {};
    this._store = assign(this._initial, this._store);
    this.enqueueNotify(undefined, ChangeTag.Reset);
  };

  // ===== 规则 =====
  setFieldRules = (name: NamePath, rules: Rule[] = []) => {
    this._rules.set(keyOfName(name), rules.slice());
  };

  // ===== 事务 =====
  begin() {
    this._txDepth++;
  }
  commit() {
    if (this._txDepth === 0) return;
    this._txDepth--;
    if (this._txDepth === 0 && this._txPending.size) {
      const snap = Array.from(this._txPending.entries());
      this._txPending.clear();
      for (const [k, mask] of snap) this._pending.set(k, (this._pending.get(k) ?? 0) | mask);
      this.scheduleFlush();
    }
  }
  rollback() {
    this._txPending.clear();
    this._txDepth = 0;
  }

  // ===== 数组操作 =====
  arrayOp(name: NamePath, op: 'insert' | 'move' | 'remove' | 'replace' | 'swap', args: any) {
    const arr = this.getFieldValue(name);
    if (!Array.isArray(arr)) return;
    const next = arr.slice();
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
    }
  }

  // ===== 更新值（核心）=====
  updateValue(name: NamePath, value: StoreValue, { touch = true } = {}) {
    const key = keyOfName(name);
    const before = get(this._store, name);
    if (isEqual(before, value)) return;

    this._store = set(this._store, name, value);

    let mask = ChangeTag.Value;
    if (touch) {
      this._touched.add(key);
      mask |= ChangeTag.Touched;
    }

    const initV = get(this._initial, name);
    isEqual(value, initV) ? this._dirty.delete(key) : this._dirty.add(key);
    mask |= ChangeTag.Dirty;

    // 清除旧错
    const hadE = this._errors.delete(key);
    const hadW = this._warnings.delete(key);
    if (hadE) mask |= ChangeTag.Errors;
    if (hadW) mask |= ChangeTag.Warnings;

    this.enqueueNotify([name], mask);
    this._callbacks.onValuesChange?.({ [key]: value }, this._store);
    this.triggerOnFieldsChange([name]);

    // 联动：把依赖它的字段排入 recompute（如果你注册了 computed，可在这里触发）
    // const dependents = this._deps.getDependentsOf(name);
    // ...
  }

  // ===== Meta & Fields =====
  getField(n: NamePath): Meta {
    const k = keyOfName(n);
    return {
      errors: this._errors.get(k) || [],
      name: k,
      touched: this._touched.has(k),
      validated: this._errors.has(k) || this._warnings.has(k),
      validating: this._validating.has(k),
      value: this.getFieldValue(n),
      warnings: this._warnings.get(k) || []
    };
  }
  private getAllFieldKeys(): string[] {
    const keys = new Set<string>([
      ...this._rules.keys(),
      ...this._touched.keys(),
      ...this._dirty.keys(),
      ...this._errors.keys(),
      ...this._warnings.keys()
    ]);
    return Array.from(keys);
  }
  private getFields(): Meta[] {
    return this.getAllFieldKeys().map(k => this.getField(tupleOfKey(k)));
  }

  // ===== 校验 =====
  async validateField(
    name: NamePath,
    opts?: { trigger?: any; validateFirst?: boolean | 'parallel' }
  ): Promise<boolean> {
    const key = keyOfName(name);
    const allRules = this._rules.get(key) || [];
    const rules = opts?.trigger
      ? allRules.filter(r => {
          const ls = toArray(r.validateTrigger);
          if (!ls.length) return true;
          const trig = toArray(opts!.trigger);
          return trig.some(t => ls.includes(t));
        })
      : allRules;
    if (!rules.length) {
      this._errors.delete(key);
      this._warnings.delete(key);
      this.enqueueNotify([name], ChangeTag.Errors | ChangeTag.Warnings);
      this.triggerOnFieldsChange([name]);
      return true;
    }

    const msList = rules.map(r => r.debounceMs ?? Infinity);
    const debounceMs = Math.min(...msList) === Infinity ? 160 : Math.min(...msList);
    const prev = this._debounceTimer.get(key);
    if (prev) clearTimeout(prev);

    const run = async (): Promise<boolean> => {
      const token = (this._validateToken.get(key) || 0) + 1;
      this._validateToken.set(key, token);

      this._validating.add(key);
      this.enqueueNotify([name], ChangeTag.Validating);

      const mode: RunMode =
        opts?.validateFirst === true ? 'serial' : opts?.validateFirst === 'parallel' ? 'parallelFirst' : 'parallelAll';

      const value = this.getFieldValue(name);
      const { errors, warns } = await runRulesWithMode(value, rules, mode, this._store, this._validateMessages);

      if (this._validateToken.get(key) !== token) return false;

      errors.length ? this._errors.set(key, errors) : this._errors.delete(key);
      warns.length ? this._warnings.set(key, warns) : this._warnings.delete(key);

      this._validating.delete(key);
      this.enqueueNotify([name], ChangeTag.Validating | ChangeTag.Errors | ChangeTag.Warnings);
      this.triggerOnFieldsChange([name]);

      return errors.length === 0;
    };

    return await new Promise<boolean>(resolve => {
      if (debounceMs > 0) {
        const t = setTimeout(async () => resolve(await run()), debounceMs);
        this._debounceTimer.set(key, t);
      } else run().then(resolve);
    });
  }

  async validateFields(names?: NamePath[], opts?: { trigger?: any; validateFirst?: boolean | 'parallel' }) {
    const list = names?.length ? names : Array.from(this._dirty).map(tupleOfKey);
    if (!list.length) return true;
    const ok = await Promise.all(list.map(n => this.validateField(n, opts)));
    return ok.every(Boolean);
  }

  // ===== 订阅 =====
  subscribeField(name: NamePath, cb: Listener['cb'], opt?: { includeChildren?: boolean; mask?: ChangeMask }) {
    const key = keyOfName(name);
    const bucket = opt?.includeChildren ? this._prefixListeners : this._exactListeners;
    let set = bucket.get(key);
    if (!set) {
      set = new Set();
      bucket.set(key, set);
    }
    const listener: Listener = { cb, mask: opt?.mask ?? ChangeTag.All };
    set.add(listener);
    let done = false;
    return () => {
      if (!done) {
        done = true;
        set!.delete(listener);
        if (set!.size === 0) bucket.delete(key);
      }
    };
  }

  // ===== 批处理通知 =====
  private markPending(key: string, mask: ChangeMask) {
    if (this._txDepth > 0) {
      this._txPending.set(key, (this._txPending.get(key) ?? 0) | mask);
    } else {
      this._pending.set(key, (this._pending.get(key) ?? 0) | mask);
    }
  }
  private enqueueNotify(names?: NamePath[] | string[], mask: ChangeMask = ChangeTag.All) {
    if (!names) this.markPending('*', ChangeTag.All);
    else
      for (const n of names)
        this.markPending(typeof n === 'string' && n.startsWith('[') ? n : keyOfName(n as NamePath), mask);
    this.scheduleFlush();
  }
  private scheduleFlush() {
    if (this._txDepth > 0) return;
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

    const fire = (key: string, mask: ChangeMask, set?: Set<Listener>) => {
      set?.forEach(({ cb, mask: m }) => {
        if ((m & mask) !== 0) cb(this.getFieldValue(tupleOfKey(key)), key, this._store, mask);
      });
    };

    if (snapshot.some(([k]) => k === '*')) {
      for (const [k, set] of this._exactListeners) fire(k, ChangeTag.All, set);
      for (const [k, set] of this._prefixListeners) fire(k, ChangeTag.All, set);
      return;
    }

    for (const [k, mask] of snapshot) fire(k, mask, this._exactListeners.get(k));

    for (const [pKey, set] of this._prefixListeners) {
      const aggMask = snapshot.reduce((m, [k, mk]) => (isPrefix(pKey, k) ? m | mk : m), 0);
      if (aggMask) fire(pKey, aggMask, set);
    }
  }

  // ===== 其它 =====
  triggerOnFieldsChange = (nameList: NamePath[]) => {
    if (!this._callbacks.onFieldsChange) return;
    const fields = this.getFields();
    const keys = new Set(nameList.map(keyOfName));
    const changed = fields.filter(f => keys.has(f.name));
    this._callbacks.onFieldsChange(changed, fields);
  };

  submit = () => {
    this.validateFields().then(ok => {
      if (ok) this._callbacks.onFinish?.(this._store);
      else this._callbacks.onFinishFailed?.(this._store);
    });
  };

  destroyForm = () => {
    this._store = {};
    this._initial = {};
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
}
