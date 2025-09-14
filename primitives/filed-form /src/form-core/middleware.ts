import type { Store, StoreValue } from '../types/formStore';
import type { NamePath } from '../utils/util';

import type { Rule, ValidateOptions } from './validation';

export interface ValidateFieldsOptions extends ValidateOptions {
  dirty?: boolean;
}

export type Action =
  | { name: NamePath; type: 'updateValue'; value: StoreValue,validate?: boolean }
  | { type: 'setFieldsValue'; values: Store,validate?: boolean }
  | { names?: NonNullable<NamePath>[]; type: 'reset' }
  | {
      name: NamePath;
      opts?: ValidateOptions;
      type: 'validateField';
  }
  | { type: 'validateFields'; name?: NamePath[];opts?: ValidateFieldsOptions}
  | { name: NamePath; rules?: Rule[]; type: 'setRules' }
  | { args: any; name: NamePath; op: 'insert' | 'move' | 'remove' | 'replace' | 'swap'; type: 'arrayOp' }
  | { entries: Array<[string, string[]]>; type: 'setExternalErrors' };

export type MiddlewareCtx = {
  dispatch(a: Action): void;
  getState(): Store;
};

export type Middleware = (ctx: MiddlewareCtx) => (next: (a: Action) => void) => (a: Action) => void;

export function compose(...fns: ((...args: any[]) => any)[]) {
  if (fns.length === 0) return (arg: any) => arg;
  if (fns.length === 1) return fns[0];
  return fns.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  );
}
