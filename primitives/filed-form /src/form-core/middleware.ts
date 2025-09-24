import type { Store, StoreValue } from '../types/formStore';
import type { NamePath } from '../utils/util';

import type { ValidateOptions } from './validation';

export interface ValidateFieldsOptions extends ValidateOptions {
  dirty?: boolean;
}

export type ArrayOp = 'insert' | 'move' | 'remove' | 'replace' | 'swap';

export type ArrayOpArgs =
  | { index: number; item: any; op: 'insert' }
  | { index: number; op: 'remove' }
  | { from: number; op: 'move'; to: number }
  | { from: number; op: 'swap'; to: number }
  | { index: number; item: any; op: 'replace' };

export type ArgsOf<T extends ArrayOp> = Extract<ArrayOpArgs, { op: T }>;

export type ArrayOpAction = { args: ArgsOf<ArrayOp>; name: NamePath; type: 'arrayOp' };

export type Action =
  | { name: NamePath; type: 'setFieldValue'; validate?: boolean; value: StoreValue }
  | { type: 'setFieldsValue'; validate?: boolean; values: Store }
  | { names?: NonNullable<NamePath>[]; type: 'reset' }
  | { name: NamePath; opts?: ValidateOptions; type: 'validateField' }
  | { name?: NamePath[]; opts?: ValidateFieldsOptions; type: 'validateFields' }
  | { entries: Array<[string, string[]]>; type: 'setExternalErrors' }
  | ArrayOpAction;

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
