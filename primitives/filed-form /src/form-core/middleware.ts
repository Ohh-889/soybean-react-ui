import type { AllPathsKeys, PathToDeepType } from 'skyroc-type-utils';

import type { MetaShapeFromPaths } from '../react/hooks/FieldContext';
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

export type Action<Values = any, T extends AllPathsKeys<Values> = AllPathsKeys<Values>> =
  | { name: T; type: 'setFieldValue'; validate?: boolean; value: PathToDeepType<Values, T> }
  | { type: 'setFieldsValue'; validate?: boolean; values: Values }
  | { names?: T[]; type: 'reset' }
  | { name: T; opts?: ValidateOptions; type: 'validateField' }
  | { name?: T[]; opts?: ValidateFieldsOptions; type: 'validateFields' }
  | { entries: Array<[T, string[]]>; type: 'setExternalErrors' }
  | ArrayOpAction;

export type MiddlewareCtx<Values, T extends AllPathsKeys<Values> = AllPathsKeys<Values>> = {
  dispatch(a: Action<Values, T>): void;
  getFields(): MetaShapeFromPaths<Values, T[]>;
  getState(): Values;
};

export type Middleware<Values = any, T extends AllPathsKeys<Values> = AllPathsKeys<Values>> = (
  ctx: MiddlewareCtx<Values, T>
) => (next: (a: Action<Values, T>) => void) => (a: Action<Values, T>) => void;

export function compose(...fns: ((...args: any[]) => any)[]) {
  if (fns.length === 0) return (arg: any) => arg;
  if (fns.length === 1) return fns[0];
  return fns.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  );
}
