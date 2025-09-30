/* eslint-disable no-nested-ternary */
/* eslint-disable no-new */
/* eslint-disable no-await-in-loop */
import { isEqual, isNil } from 'skyroc-utils';

import type { StoreValue } from './types';

/**
 * Discriminated union describing the expected value type for validation.
 * Determines which built-in type checks will run for a rule.
 *
 * - 'string': validates string length and pattern
 * - 'number': validates numeric range and equality
 * - 'integer': validates integers only with optional min/max
 * - 'float': validates finite non-integer numbers
 * - 'boolean': validates a boolean primitive
 * - 'date': validates a Date or date-like value with optional min/max
 * - 'enum': validates membership in a provided enum array (deep-equals)
 * - 'email': validates a simple email pattern
 * - 'hex': validates hex color strings (#RGB[A], #RRGGBB[AA])
 * - 'regexp': validates a RegExp instance or a compilable pattern string
 * - 'url': validates a URL parsable by the URL constructor
 */
export type RuleType =
  | 'boolean'
  | 'date'
  | 'email'
  | 'enum'
  | 'float'
  | 'hex'
  | 'integer'
  | 'number'
  | 'regexp'
  | 'string'
  | 'url';

/** Custom validator signature. Return a message string to fail, or a falsy value to pass. May be async. */
type Validator = (
  rule: Rule,
  value: StoreValue,
  values: StoreValue
) => Promise<string | any> | string | undefined | null;

/** Validation rule configuration combining base, type-specific, and custom validations. */
export interface Rule {
  /** Optional debounce time in milliseconds for async validators. */
  debounceMs?: number;
  /** Allowed values for type 'enum'. Compared by deep equality. */
  enum?: StoreValue[];
  /** Exact numeric value or exact string length, depending on type. */
  len?: number;
  /** Maximum numeric value or latest date/time allowed. */
  max?: number | Date | string;
  /** Maximum string length allowed (type 'string'). */
  maxLength?: number;
  /** Override default error/warning message. */
  message?: string;
  /** Minimum numeric value or earliest date/time allowed. */
  min?: number | Date | string;
  /** Minimum string length allowed (type 'string'). */
  minLength?: number;
  /** Regular expression to test a string value against. */
  pattern?: RegExp;
  /** Whether the field is required (non-empty). */
  required?: boolean;
  /** If true (default), skip checks when empty and not required. */
  skipIfEmpty?: boolean;
  /** Transform the raw value before validation. */
  transform?: (value: StoreValue) => StoreValue;
  /** Declares which built-in type validators should run. Defaults to 'string'. */
  type?: RuleType;
  /** Which trigger(s) cause this rule to run (e.g., 'change', 'blur'). */
  validateTrigger?: string | string[];
  /** Custom validator executed after base and type-specific checks. */
  validator?: Validator;
  /** Treat failures as warnings instead of errors when true. */
  warningOnly?: boolean;
  /** Disallow strings that contain only whitespace when true. */
  whitespace?: boolean;
}

/** Execution strategy for running multiple rules. */
export type RunMode = 'parallelAll' | 'parallelFirst' | 'serial';

/** Options controlling validation execution, including mode and triggers. */
export type ValidateOptions = {
  /** Rule execution mode; see RunMode. */
  mode?: RunMode;
  /** Which trigger(s) initiated validation; used to filter rules. */
  trigger?: string | string[];
};

/** Result of a single rule execution: error or warning message. */
type Res = { err?: string; warn?: string };
/** Context passed to a check function, including the rule and all form values. */
type Ctx = { rule: Rule; value: any; values: StoreValue };
/** Function type for an individual check strategy. */
type Check = (ctx: Ctx) => Promise<Res> | Res;

/**
 * Utility functions for validation
 * Contains helper functions for checking empty values, whitespace, dates, and other common validations
 */
/** Successful validation result (no error and no warning). */
const ok = (): Res => ({});
/** Build a failure result, honoring rule.warningOnly and rule.message overrides. */
const fail = (r: Rule, dft: string): Res => (r.warningOnly ? { warn: r.message || dft } : { err: r.message || dft });

/** True when value is null/undefined, empty string, or empty array. */
const isEmpty = (v: any) =>
  isNil(v) || (typeof v === 'string' && v?.length === 0) || (Array.isArray(v) && v?.length === 0);

/** True when a string contains only whitespace characters. */
const onlyWhitespace = (s: string) => s?.length > 0 && s?.trim().length === 0;
/** True for finite numbers (not NaN/Infinity). */
const isFiniteNumber = (v: any) => Number.isFinite(v);

/**
 * Normalize a date-like value to a millisecond timestamp.
 * Returns null when the value cannot be interpreted as a valid date/time.
 */
const toDateMs = (d: number | string | Date): number | null => {
  if (d instanceof Date) return Number.isNaN(d.getTime()) ? null : d.getTime();
  if (typeof d === 'number') return Number.isFinite(d) ? d : null;
  if (typeof d === 'string') {
    const t = Date.parse(d);
    return Number.isNaN(t) ? null : t;
  }
  return null;
};

/** Simple email validation based on a non-whitespace/local@domain.tld pattern. */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
/** Hex color validator supporting 3/4/6/8 digit forms with optional leading '#'. */
const isHexColor = (s: string) => /^#?(?:[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(s);
/** Validates that a string can be parsed by the URL constructor. */
const isURL = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

/**
 * Strategy Manager for Rule Validation
 * Implements a flexible validation system using the Strategy pattern
 * Manages different types of validation rules and their execution
 */
class RuleChecker {
  private baseChecks: Check[] = [];
  private typeChecks: Record<RuleType, Check[]> = {} as any;
  private customCheck: Check | null = null;

  /** Register a base check that always runs before type-specific and custom checks. */
  registerBase(check: Check) {
    this.baseChecks.push(check);
  }
  /** Register one or more checks for a specific RuleType. */
  registerType(type: RuleType, ...checks: Check[]) {
    this.typeChecks[type] = checks;
  }
  /** Register a single custom check that will run after base and type checks. */
  registerCustom(check: Check) {
    this.customCheck = check;
  }

  /**
   * Run all applicable checks for a single rule against a value.
   * Applies transform first, then base checks, type checks, and finally the custom check.
   */
  async check(value: any, rule: Rule, allValues: StoreValue): Promise<Res> {
    const r = rule || {};
    const v = typeof r.transform === 'function' ? r.transform(value) : value;

    // 1) base
    for (const c of this.baseChecks) {
      const res = await c({ rule: r, value: v, values: allValues });
      if (res.err || res.warn) return res;
    }

    // 2) type-specific
    const actualType: RuleType = r.type ?? 'string';
    if (this.typeChecks[actualType]) {
      for (const c of this.typeChecks[actualType]) {
        const res = await c({ rule: r, value: v, values: allValues });
        if (res.err || res.warn) return res;
      }
    }

    // 3) custom validator
    if (this.customCheck) {
      const res = await this.customCheck({ rule: r, value: v, values: allValues });
      if (res.err || res.warn) return res;
    }

    return ok();
  }
}

/* ---------- Strategy Registration ---------- */
const checker = new RuleChecker();

// base: required / whitespace / skipIfEmpty
checker.registerBase(({ rule: r, value: v }) => {
  if (r.required) {
    if (isEmpty(v)) return fail(r, 'This field is required');
    if (r.whitespace && typeof v === 'string' && onlyWhitespace(v)) return fail(r, 'Only whitespace is not allowed');
  } else if (r.skipIfEmpty !== false && isEmpty(v)) {
    return ok();
  }
  return ok();
});

// string
checker.registerType('string', ({ rule: r, value: v }) => {
  if ((!isNil(r.minLength) && (v as string)?.length < r.minLength) || (isNil(v) && r.minLength))
    return fail(r, `Min length is ${r.minLength}`);
  if (!isNil(r.maxLength) && (v as string)?.length > r.maxLength) return fail(r, `Max length is ${r.maxLength}`);
  if ((!isNil(r.len) && (v as string)?.length !== r.len) || (isNil(v) && r.len))
    return fail(r, `Length must be ${r.len}`);
  if (r.pattern && !r.pattern.test(v as string)) return fail(r, 'Pattern not match');
  return ok();
});

// number
checker.registerType('number', ({ rule: r, value: v }) => {
  const num = Number(v);
  if (!isFiniteNumber(num)) return fail(r, 'Must be a number');

  if (!isNil(r.min) && num < (r.min as number)) return fail(r, `Min is ${r.min}`);
  if (!isNil(r.max) && num > (r.max as number)) return fail(r, `Max is ${r.max}`);
  if (!isNil(r.len) && num !== r.len) return fail(r, `Must equal ${r.len}`);
  return ok();
});

// integer
checker.registerType('integer', ({ rule: r, value: v }) => {
  const num = Number(v);
  if (!Number.isInteger(num)) return fail(r, 'Must be an integer');
  if (!isNil(r.min) && num < (r.min as number)) return fail(r, `Min is ${r.min}`);
  if (!isNil(r.max) && num > (r.max as number)) return fail(r, `Max is ${r.max}`);
  return ok();
});

// float
checker.registerType('float', ({ rule: r, value: v }) => {
  const num = Number(v);
  if (!isFiniteNumber(num) || Number.isInteger(num)) return fail(r, 'Must be a float');
  return ok();
});

// date
checker.registerType('date', ({ rule: r, value: v }) => {
  const ms = v instanceof Date ? v.getTime() : toDateMs(v);
  if (ms === null) return fail(r, 'Must be a valid Date');
  if (!isNil(r.min) && ms < toDateMs(r.min as any)!) return fail(r, 'Date is earlier than minimum');
  if (!isNil(r.max) && ms > toDateMs(r.max as any)!) return fail(r, 'Date is later than maximum');
  return ok();
});

// enum
checker.registerType('enum', ({ rule: r, value: v }) => {
  if (!Array.isArray(r.enum) || r.enum.length === 0) return ok();
  return r.enum.some(item => isEqual(item, v)) ? ok() : fail(r, 'Value is not in enum');
});

// others
checker.registerType('boolean', ({ rule: r, value: v }) => {
  if (typeof v !== 'boolean') {
    return fail(r, 'Must be a boolean');
  }
  return ok();
});

checker.registerType('email', ({ rule: r, value: v }) =>
  isEmail(v as string) ? ok() : fail(r, 'Must be a valid email')
);
checker.registerType('hex', ({ rule: r, value: v }) =>
  isHexColor(v as string) ? ok() : fail(r, 'Must be a valid hex color')
);

checker.registerType('regexp', ({ rule: r, value: v }) => {
  if (isEmpty(v) && r.skipIfEmpty !== false) return ok();

  if (v instanceof RegExp) return ok();
  if (typeof v === 'string') {
    try {
      new RegExp(v);
      return ok();
    } catch {
      return fail(r, 'Must be a valid regular expression');
    }
  }
  return fail(r, 'Must be a valid regular expression');
});

checker.registerType('url', ({ rule: r, value: v }) => (isURL(v as string) ? ok() : fail(r, 'Must be a valid URL')));

// custom validator
checker.registerCustom(async ({ rule: r, value: v, values }) => {
  if (typeof r.validator !== 'function') return ok();
  const res = await r.validator(r, v, values);
  return typeof res === 'string' && res ? (r.warningOnly ? { warn: res } : { err: res }) : ok();
});

/* ---------- API ---------- */
/**
 * Validate a single rule against a value.
 */
export async function checkOneRule(value: any, rule: Rule, allValues: StoreValue): Promise<Res> {
  return checker.check(value, rule, allValues);
}

/**
 * Validate multiple rules using the specified execution mode.
 * - serial: run sequentially and stop on first non-warning error
 * - parallelFirst: run in parallel and resolve on first non-warning error
 * - parallelAll: run all in parallel, collecting all errors and warnings
 */
export async function runRulesWithMode(
  value: any,
  rules: Rule[],
  mode: RunMode,
  allValues: StoreValue
): Promise<{ errors: string[]; warns: string[] }> {
  const errors: string[] = [];
  const warns: string[] = [];
  if (!Array.isArray(rules) || rules.length === 0) return { errors, warns };

  if (mode === 'serial') {
    for (const r of rules) {
      const { err, warn } = await checkOneRule(value, r, allValues);
      if (warn) warns.push(warn);
      if (err && !r.warningOnly) {
        errors.push(err);
        break;
      }
    }
    return { errors, warns };
  }

  const tasks = rules.map(async r => {
    const { err, warn } = await checkOneRule(value, r, allValues);
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
