'use client';
/* eslint-disable no-bitwise */

import { createContext, useContext } from 'react';
import type { AllPathsKeys, DeepPartial, MergeUnion, PathToDeepType, ShapeFromPaths, Wrap } from 'skyroc-type-utils';

import type { ChangeMask } from '../../form-core/event';
import type { Action, Middleware } from '../../form-core/middleware';
import type { FieldEntity } from '../../form-core/types';
import type { ValidateMessages } from '../../form-core/validate';
import type { Rule, ValidateOptions } from '../../form-core/validation';
import type { Meta } from '../../types/shared-types';

import type { FormState } from './types';

// 核心改造：给每条路径套上 Meta
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

// 把路径数组转成 Meta 层级结构
export type MetaShapeFromPaths<T, Ps extends readonly string[]> = Ps extends never[] | []
  ? { [K in keyof T]: Meta<K & string, PathToDeepType<T, K & string>> }
  : MergeUnion<Ps[number] extends infer P ? (P extends string ? BuildMetaShape<T, P> : never) : never>;

export interface ValuesOptions<Values = any> {
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
  // 便于 UI 直接滚动
  errorCount: number; // 可选：按 _pruneForSubmit 过滤后的值（给埋点/回放）
  errorFields: Meta<string, any>[]; // 逐字段列表（用于滚动到第一个错误、逐项显示）
  errorMap: Record<string, string[]>; // 同上：警告
  firstErrorName?: string; // 全量当前值（未裁剪）
  submittedAt: number;
  values: Values; // 快速索引（表头红点、侧边分组统计）
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
  /** 内部 API，不建议外部使用 */
  getInternalHooks: () => InternalFormHooks<Values>;
}

export const FieldContext = createContext<InternalFormContext | null>(null);

export const FieldContextProvider = FieldContext.Provider;

export const useFieldContext = <Values = any>(): InternalFormContext<Values> | null => {
  const context = useContext(FieldContext);

  return context;
};
