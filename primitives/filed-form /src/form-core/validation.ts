import { isNil } from 'skyroc-utils';

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

type Validator = (
  rule: RuleObject,
  value: StoreValue
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => Promise<void | any> | void;

export interface BaseRule {
  debounceMs?: number;
  /** - enum. Whether the value matches one in the enum (type must be set to enum) */
  enum?: StoreValue[];
  /** - len. The length of the value
   *  - string 类型时为字符串长度；number 类型时为确定数字；
   */
  len?: number;
  /** - max. The maximum value */
  max?: number;
  /** - maxLength. The maximum length of the value */
  maxLength?: number;
  /** - message. The message of the rule */
  message?: string;
  /** - min. The minimum value */
  min?: number;
  /** - minLength. The minimum length of the value */
  minLength?: number;
  /** - pattern. The pattern of the value */
  pattern?: RegExp;
  /** - required. Whether the value is required */
  required?: boolean;
  /** - transform. The transform of the value */
  transform?: (value: StoreValue) => StoreValue;
  type?: RuleType;
  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: string | string[];
  /** - validator. The validator of the value */
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

// 返回 { err?: string, warn?: string }
// eslint-disable-next-line complexity
export async function checkOneRule(value: any, r: Rule): Promise<{ err?: string; warn?: string }> {
  if (r.required) {
    if (isNil(value)) {
      const msg = r.message || 'This field is required';

      return r.warningOnly ? { warn: msg } : { err: msg };
    }

    if (r.whitespace && typeof value === 'string' && value.length > 0 && value.trim().length === 0) {
      return r.warningOnly
        ? { warn: r.message || 'Only whitespace is not allowed' }
        : { err: r.message || 'Only whitespace is not allowed' };
    }
  }

  // 长度/范围
  if (typeof value === 'string') {
    if (!isNil(r.minLength) && value.length < r.minLength) {
      const msg = r.message || `Min length is ${r.minLength}`;
      return r.warningOnly ? { warn: msg } : { err: msg };
    }
    if (!isNil(r.maxLength) && value.length > r.maxLength) {
      const msg = r.message || `Max length is ${r.maxLength}`;
      return r.warningOnly ? { warn: msg } : { err: msg };
    }
  }
  if (typeof value === 'number') {
    if (!isNil(r.min) && value < r.min) {
      const msg = r.message || `Min is ${r.min}`;
      return r.warningOnly ? { warn: msg } : { err: msg };
    }
    if (!isNil(r.max) && value > r.max) {
      const msg = r.message || `Max is ${r.max}`;
      return r.warningOnly ? { warn: msg } : { err: msg };
    }
  }

  // 正则
  if (r.pattern && typeof value === 'string' && !r.pattern.test(value)) {
    const msg = r.message || 'Pattern not match';
    return r.warningOnly ? { warn: msg } : { err: msg };
  }

  // 自定义
  if (r.validator) {
    const res = await r.validator(r, value);

    if (typeof res === 'string' && res) {
      return r.warningOnly ? { warn: res } : { err: res };
    }
  }

  return {};
}

export async function runRulesWithMode(
  value: any,
  rules: Rule[],
  mode: RunMode
): Promise<{ errors: string[]; warns: string[] }> {
  const errors: string[] = [];
  const warns: string[] = [];

  if (mode === 'serial') {
    for (const r of rules) {
      // eslint-disable-next-line no-await-in-loop
      const { err, warn } = await checkOneRule(value, r);
      if (warn) warns.push(warn);

      if (err) {
        errors.push(err);
        break;
      } // 非 warning 首错停
    }
    return { errors, warns };
  }

  // 并行：每条规则一个 Promise
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

  // parallelAll：并行收集全部
  const results = await Promise.all(tasks);
  for (const { err, warn } of results) {
    if (warn) warns.push(warn);
    if (err) errors.push(err);
  }
  return { errors, warns };
}
