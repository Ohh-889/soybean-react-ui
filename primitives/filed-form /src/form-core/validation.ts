/* eslint-disable no-await-in-loop */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-new */
import { isEqual, isNil } from 'skyroc-utils';

import type { StoreValue } from '../types/formStore';

export type RuleType =
  | 'boolean'
  | 'date'
  | 'email'
  | 'enum'
  | 'float'
  | 'hex'
  | 'integer'
  | 'method'
  | 'number'
  | 'object'
  | 'regexp'
  | 'string'
  | 'url';

type Validator = (rule: RuleObject, value: StoreValue) => Promise<string | any> | string | undefined | null;

export interface BaseRule {
  // default true
  coerce?: boolean;

  debounceMs?: number;
  enum?: StoreValue[];

  len?: number;
  max?: number | Date | string;

  maxLength?: number;
  message?: string;

  min?: number | Date | string;
  minLength?: number;

  pattern?: RegExp;
  required?: boolean;

  /** extras */
  skipIfEmpty?: boolean;
  transform?: (value: StoreValue) => StoreValue;

  // default false
  type?: RuleType;
  validateTrigger?: string | string[];

  validator?: Validator;
  warningOnly?: boolean;
  whitespace?: boolean;
}

export type RuleObject = BaseRule;

export type Rule = RuleObject;

export type RunMode = 'parallelAll' | 'parallelFirst' | 'serial';

export type ValidateOptions = {
  mode?: RunMode;
  trigger?: string | string[];
};

/* ---------- small utils ---------- */
type Res = { err?: string; warn?: string };

const ok = (): Res => ({});

const fail = (r: Rule, dft: string): Res => (r.warningOnly ? { warn: r.message || dft } : { err: r.message || dft });

const isEmpty = (v: any) =>
  isNil(v) || (typeof v === 'string' && v.length === 0) || (Array.isArray(v) && v.length === 0);

const onlyWhitespace = (s: string) => s.length > 0 && s.trim().length === 0;

const isFiniteNumber = (v: any) => typeof v === 'number' && Number.isFinite(v);
const coerceNumber = (v: any) => (typeof v === 'string' ? Number(v) : v);

const toDateMs = (d: number | string | Date): number | null => {
  if (d instanceof Date) return Number.isNaN(d.getTime()) ? null : d.getTime();
  if (typeof d === 'number') return Number.isFinite(d) ? d : null;
  if (typeof d === 'string') {
    const t = Date.parse(d);
    return Number.isNaN(t) ? null : t;
  }
  return null;
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isHexColor = (s: string) => /^#?(?:[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(s);
const isURL = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

/* ---------- Strategy: each check is a small function ---------- */
type Ctx = { rule: Rule; value: any };
type Check = (ctx: Ctx) => Promise<Res> | Res;

/** 1) base required/whitespace/empty-skip */
const requiredCheck: Check = ({ rule: r, value: v }) => {
  if (r.required) {
    if (isEmpty(v)) {
      return fail(r, 'This field is required');
    }

    if (r.whitespace && typeof v === 'string' && onlyWhitespace(v)) return fail(r, 'Only whitespace is not allowed');
  } else if (r.skipIfEmpty !== false && isEmpty(v)) {
    // 非必填 + 空值：其余检查直接跳过（返回 ok）
    return ok();
  }
  return ok();
};

/** 2) type strategies（无 switch，通过 map 注册） */
const typeStrategies: Record<Exclude<RuleType, 'enum'>, Check> = {
  boolean: ({ rule: r, value: v }) => (typeof v === 'boolean' ? ok() : fail(r, 'Must be a boolean')),
  date: ({ rule: r, value: v }) => {
    const ms = v instanceof Date ? v.getTime() : r.coerce && typeof v === 'string' ? Date.parse(v) : Number.NaN;
    return Number.isFinite(ms) ? ok() : fail(r, 'Must be a valid Date');
  },
  email: ({ rule: r, value: v }) => (typeof v === 'string' && isEmail(v) ? ok() : fail(r, 'Must be a valid email')),
  float: ({ rule: r, value: v }) => {
    const vv = r.coerce ? coerceNumber(v) : v;
    return isFiniteNumber(vv) && !Number.isInteger(vv) ? ok() : fail(r, 'Must be a float');
  },
  hex: ({ rule: r, value: v }) =>
    typeof v === 'string' && isHexColor(v) ? ok() : fail(r, 'Must be a valid hex color'),
  integer: ({ rule: r, value: v }) => {
    const vv = r.coerce ? coerceNumber(v) : v;
    return Number.isInteger(vv) ? ok() : fail(r, 'Must be an integer');
  },
  method: ({ rule: r, value: v }) => (typeof v === 'function' ? ok() : fail(r, 'Must be a function')),
  number: ({ rule: r, value: v }) => {
    const vv = r.coerce ? coerceNumber(v) : v;
    return isFiniteNumber(vv) ? ok() : fail(r, 'Must be a number');
  },
  object: ({ rule: r, value: v }) =>
    v !== null && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date)
      ? ok()
      : fail(r, 'Must be a plain object'),
  regexp: ({ rule: r, value: v }) => (v instanceof RegExp ? ok() : fail(r, 'Must be a RegExp')),
  string: ({ rule: r, value: v }) => (typeof v === 'string' ? ok() : fail(r, 'Must be a string')),
  url: ({ rule: r, value: v }) => (typeof v === 'string' && isURL(v) ? ok() : fail(r, 'Must be a valid URL'))
};

/** 3) constraint pack（通过“适用条件”组合，避免 if 池） */
const constraints: Check[] = [
  // string/array: length family
  ({ rule: r, value: v }) => {
    const applicable = typeof v === 'string' || Array.isArray(v);
    if (!applicable) return ok();
    const L = (v as string | any[]).length;
    if (!isNil(r.minLength) && L < r.minLength!) return fail(r, `Min length is ${r.minLength}`);
    if (!isNil(r.maxLength) && L > r.maxLength!) return fail(r, `Max length is ${r.maxLength}`);
    if (!isNil(r.len) && L !== r.len) return fail(r, `Length must be ${r.len}`);
    return ok();
  },

  // number family: min/max/len(equal)
  ({ rule: r, value: v }) => {
    const isNumType = r.type === 'number' || r.type === 'integer' || r.type === 'float';
    if (!isNumType) return ok();
    const num = r.coerce ? coerceNumber(v) : v;
    if (!isFiniteNumber(num)) return ok(); // 类型检查已负责报错，此处仅范围
    if (!isNil(r.min) && num < (r.min as number)) return fail(r, `Min is ${r.min as number}`);
    if (!isNil(r.max) && num > (r.max as number)) return fail(r, `Max is ${r.max as number}`);
    if (!isNil(r.len) && num !== r.len) return fail(r, `Must equal ${r.len}`);
    return ok();
  },

  // date family: min/max
  ({ rule: r, value: v }) => {
    if (r.type !== 'date') return ok();
    const ms = v instanceof Date ? v.getTime() : toDateMs(v);
    if (ms === null) return ok(); // 类型检查已负责
    if (!isNil(r.min)) {
      const minMs = toDateMs(r.min as any);
      if (minMs !== null && ms < minMs) return fail(r, 'Date is earlier than minimum');
    }
    if (!isNil(r.max)) {
      const maxMs = toDateMs(r.max as any);
      if (maxMs !== null && ms > maxMs) return fail(r, 'Date is later than maximum');
    }
    return ok();
  },

  // pattern
  ({ rule: r, value: v }) => {
    if (!r.pattern) return ok();
    return typeof v === 'string' && r.pattern.test(v) ? ok() : fail(r, 'Pattern not match');
  },

  // enum（深等）
  ({ rule: r, value: v }) => {
    if (r.type !== 'enum' || !Array.isArray(r.enum) || r.enum.length === 0) return ok();
    return r.enum.some(item => (isEqual as any)(item, v)) ? ok() : fail(r, 'Value is not in enum');
  }
];

/** 4) custom validator */
const customValidator: Check = async ({ rule: r, value: v }) => {
  if (typeof r.validator !== 'function') return ok();
  const res = await r.validator(r, v);
  return typeof res === 'string' && res ? (r.warningOnly ? { warn: res } : { err: res }) : ok();
};

/* ---------- main: checkOneRule（管线式执行） ---------- */
export async function checkOneRule(value: any, rule: Rule): Promise<Res> {
  // 0) transform
  const r = rule || {};
  const v = typeof r.transform === 'function' ? r.transform(value) : value;

  // 1) required / whitespace / empty-skip
  const base = requiredCheck({ rule: r, value: v });

  if ('then' in (base as any)) {
    const b = await (base as Promise<Res>);
    if (b.err || b.warn) return b;
  } else if ((base as Res).err || (base as Res).warn) {
    return base as Res;
  }
  // 非必填空值：已早退

  // 2) type strategy（enum 走 constraints）
  if (r.type && r.type !== 'enum') {
    const strat = (typeStrategies as any)[r.type] as Check | undefined;
    if (strat) {
      const res = await strat({ rule: r, value: v });
      if (res.err || res.warn) return res;
    }
  }

  // 3) constraints pack
  for (const check of constraints) {
    const res = await check({ rule: r, value: v });
    if (res.err || res.warn) return res;
  }

  // 4) custom
  const cus = await customValidator({ rule: r, value: v });
  if (cus.err || cus.warn) return cus;

  return ok();
}

/* ---------- unchanged API: runRulesWithMode ---------- */
export async function runRulesWithMode(
  value: any,
  rules: Rule[],
  mode: RunMode
): Promise<{ errors: string[]; warns: string[] }> {
  const errors: string[] = [];
  const warns: string[] = [];
  if (!Array.isArray(rules) || rules.length === 0) return { errors, warns };

  if (mode === 'serial') {
    for (const r of rules) {
      // eslint-disable-next-line no-await-in-loop
      const { err, warn } = await checkOneRule(value, r);
      if (warn) warns.push(warn);
      if (err && !r.warningOnly) {
        errors.push(err);
        break;
      }
    }
    return { errors, warns };
  }

  const tasks = rules.map(async r => {
    const { err, warn } = await checkOneRule(value, r);
    return { err, warn, warningOnly: Boolean(r.warningOnly) };
  });

  if (mode === 'parallelFirst') {
    return await new Promise(resolve => {
      let done = false;
      let remain = tasks.length;
      tasks.forEach(p =>
        p.then(({ err, warn, warningOnly }) => {
          if (done) return;
          if (warn) warns.push(warn);
          if (err && !warningOnly) {
            done = true;
            resolve({ errors: [err], warns });
            return;
          }
          if ((remain -= 1) === 0) resolve({ errors, warns });
        })
      );
    });
  }

  const results = await Promise.all(tasks);
  for (const { err, warn, warningOnly } of results) {
    if (warn) warns.push(warn);
    if (err && !warningOnly) errors.push(err);
  }
  return { errors, warns };
}
