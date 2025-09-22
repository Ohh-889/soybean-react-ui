'use client';
/* eslint-disable no-bitwise */

import { createContext, useContext } from 'react';
import type {
  AllPathsKeys,
  ArrayElementValue,
  ArrayKeys,
  DeepPartial,
  MergeUnion,
  PathToDeepType,
  ShapeFromPaths,
  Wrap
} from 'skyroc-type-utils';

import type { ChangeMask } from '../../form-core/event';
import type { Action, Middleware } from '../../form-core/middleware';
import type { FieldEntity, StoreValue } from '../../form-core/types';
import type { ValidateMessages } from '../../form-core/validate';
import type { Rule, ValidateOptions } from '../../form-core/validation';
import type { Meta } from '../../types/shared-types';

import type { FormState } from './types';

export type ListRenderItem = {
  key: string;
  name: string;
};

// Core change: wrap each path with Meta
type BuildMetaShape<T, P extends string> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? T[K] extends readonly (infer U)[]
      ? Wrap<Extract<K, string>, Array<BuildMetaShape<U, R>>>
      : Wrap<Extract<K, string>, BuildMetaShape<T[K], R>>
    : never
  : P extends `${infer K}`
    ? K extends keyof T
      ? Wrap<Extract<K, string>, Meta<P, PathToDeepType<T, P>>>
      : never
    : never;

// Convert an array of paths into a hierarchical Meta structure
export type MetaShapeFromPaths<T, Ps extends readonly string[]> = Ps extends never[] | []
  ? { [K in keyof T]: Meta<K & string, PathToDeepType<T, K & string>> }
  : MergeUnion<Ps[number] extends infer P ? (P extends string ? BuildMetaShape<T, P> : never) : never>;

export interface ValuesOptions<Values = any> {
  arrayOp: <K extends ArrayKeys<Values>>(
    name: K
  ) => {
    insert: (index: number, item: ArrayElementValue<Values, K>) => void;
    move: (from: number, to: number) => void;
    remove: (index: number) => void;
    replace: (index: number, val: ArrayElementValue<Values, K>) => void;
    swap: (i: number, j: number) => void;
  };
  getFieldsValue: <K extends AllPathsKeys<Values>[]>(name?: K) => ShapeFromPaths<Values, K>;
  getFieldValue: <T extends AllPathsKeys<Values>>(name: T) => PathToDeepType<Values, T>;
  setFieldsValue: (values: DeepPartial<Values>) => void;
  setFieldValue: <T extends AllPathsKeys<Values>>(name: T, value: PathToDeepType<Values, T>) => void;
}

export interface StateOptions<Values = any> {
  getField: <T extends AllPathsKeys<Values>>(name: T) => Meta<T, PathToDeepType<Values, T>>;
  getFieldError: (name: AllPathsKeys<Values>) => string[];
  getFields: <T extends AllPathsKeys<Values>[]>(names?: T) => MetaShapeFromPaths<Values, T>;
  getFieldsError: (names?: AllPathsKeys<Values>[]) => Record<AllPathsKeys<Values>, string[]>;
  getFieldsTouched: (names?: AllPathsKeys<Values>[]) => boolean;
  getFieldsValidated: (names?: AllPathsKeys<Values>[]) => boolean;
  getFieldsValidating: (names?: AllPathsKeys<Values>[]) => boolean;
  getFieldsWarning: (names?: AllPathsKeys<Values>[]) => Record<AllPathsKeys<Values>, string[]>;
  getFieldTouched: (name: AllPathsKeys<Values>) => boolean;
  getFieldValidated: (name: AllPathsKeys<Values>) => boolean;
  getFieldValidating: (name: AllPathsKeys<Values>) => boolean;
  getFieldWarning: (name: AllPathsKeys<Values>) => string[];
  getFormState: () => FormState;
}

export interface ValidateFieldsOptions extends ValidateOptions {
  dirty?: boolean;
}

export interface OperationOptions<Values = any> {
  resetFields: (names?: AllPathsKeys<Values>[]) => void;
  submit: () => void;
  use: (mw: Middleware) => void;
  validateField: (name: AllPathsKeys<Values>) => Promise<boolean>;
  validateFields: (names?: AllPathsKeys<Values>[], opts?: ValidateFieldsOptions) => Promise<boolean>;
}

export interface ValidateErrorEntity<Values = any> {
  // For UI to scroll directly
  errorCount: number; // Optional: values filtered by _pruneForSubmit (for analytics/replay)
  errorFields: Meta<string, any>[]; // Per-field list (used to scroll to the first error and show items)
  errorMap: Record<string, string[]>; // Same as above: warnings
  firstErrorName?: string; // Full current values (not pruned)
  submittedAt: number;
  values: Values; // Fast index (header red dot, side group statistics)
  warningMap: Record<string, string[]>;
}

export interface RegisterCallbackOptions<Values = any> {
  onFieldsChange?: (
    changedFields: Meta<AllPathsKeys<Values>, PathToDeepType<Values, AllPathsKeys<Values>>>[],
    allFields: Meta<AllPathsKeys<Values>, PathToDeepType<Values, AllPathsKeys<Values>>>[]
  ) => void;

  onFinish?: (values: Values) => void;

  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;

  onValuesChange?: (changedValues: Partial<Values>, values: Values) => void;
}

export interface InternalCallbacks<Values = any> {
  destroyForm: (clearOnDestroy?: boolean) => void;
  setCallbacks: (callbacks: RegisterCallbackOptions<Values>) => void;
  setInitialValues: (values: DeepPartial<Values>) => void;
  setPreserve: (preserve: boolean) => void;
  setValidateMessages: (messages: ValidateMessages) => void;
}

export interface InternalFieldHooks<Values = any> {
  dispatch: (action: Action) => void;
  getArrayFields: (name: ArrayKeys<Values>, initialValue?: StoreValue[]) => ListRenderItem[];
  getInitialValue: <T extends AllPathsKeys<Values>>(name: T) => PathToDeepType<Values, T>;
  registerComputed: <T extends AllPathsKeys<Values>>(
    name: T,
    deps: AllPathsKeys<Values>[],
    compute: (get: (n: AllPathsKeys<Values>) => any, all: Values) => PathToDeepType<Values, T>
  ) => () => void;
  registerField: (entity: FieldEntity) => () => void;
  setFieldRules: (name: AllPathsKeys<Values>, rules?: Rule[]) => void;
  setRules: (name: AllPathsKeys<Values>, rules?: Rule[]) => void;
  subscribeField: <T extends AllPathsKeys<Values>>(
    name: T | T[] | undefined,
    cb: (value: PathToDeepType<Values, T>, name: T, values: Values, mask: ChangeMask) => void,
    opt?: { includeChildren?: boolean; mask?: ChangeMask }
  ) => () => void;
}

export interface FormInstance<Values = any>
  extends ValuesOptions<Values>,
    StateOptions<Values>,
    OperationOptions<Values> {}

export interface InternalFormHooks<Values = any> extends InternalCallbacks<Values>, InternalFieldHooks<Values> {}

export interface InternalFormContext<Values = any> extends FormInstance<Values> {
  validateTrigger: string | string[];
}

export interface InternalFormInstance<Values = any> extends InternalFormContext<Values> {
  /** Internal API, not recommended for external use */
  getInternalHooks: () => InternalFormHooks<Values>;
}

export const FieldContext = createContext<InternalFormContext | null>(null);

export const FieldContextProvider = FieldContext.Provider;

export const useFieldContext = <Values = any>(): InternalFormContext<Values> | null => {
  const context = useContext(FieldContext);

  return context;
};
