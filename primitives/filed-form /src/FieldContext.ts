'use client';
/* eslint-disable no-bitwise */

import { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import type { AllPathsKeys, DeepPartial, PathToDeepType, ShapeFromPaths } from 'skyroc-type-utils';
import { isArray, toArray } from 'skyroc-utils';

import type { ChangeMask, SubscribeMaskOptions } from './form-core/event';
import { toMask } from './form-core/event';
import type { Action, Middleware } from './form-core/middleware';
import type { FieldEntity } from './form-core/types';
import type { ValidateMessages } from './form-core/validate';
import type { Rule, ValidateOptions } from './form-core/validation';
import type { FormState } from './types';
import type { Meta } from './types/shared-types';

export interface ValuesOptions<Values = any> {
  getFieldsValue: <K extends AllPathsKeys<Values>[]>(name?: K) => ShapeFromPaths<Values, K>;
  getFieldValue: <T extends AllPathsKeys<Values>>(name: T) => PathToDeepType<Values, T>;
  setFieldsValue: (values: DeepPartial<Values>) => void;
  setFieldValue: <T extends AllPathsKeys<Values>>(name: T, value: PathToDeepType<Values, T>) => void;
}

export interface StateOptions<Values = any> {
  getField: <T extends AllPathsKeys<Values>>(name: T) => Meta<T, PathToDeepType<Values, T>>;
  getFieldError: (name: AllPathsKeys<Values>) => string[];
  getFields: (
    names?: AllPathsKeys<Values>[]
  ) => Meta<AllPathsKeys<Values>, PathToDeepType<Values, AllPathsKeys<Values>>>[];
  getFieldsError: (...name: AllPathsKeys<Values>[]) => Record<AllPathsKeys<Values>, string[]>;
  getFieldsTouched: (...name: AllPathsKeys<Values>[]) => boolean;
  getFieldsValidated: (...name: AllPathsKeys<Values>[]) => boolean;
  getFieldsValidating: (...name: AllPathsKeys<Values>[]) => boolean;
  getFieldsWarning: (...name: AllPathsKeys<Values>[]) => Record<AllPathsKeys<Values>, string[]>;
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
    name: T,
    cb: (value: PathToDeepType<Values, T>, name: T, values: Values, mask: ChangeMask) => void,
    opt?: { includeChildren?: boolean; mask?: ChangeMask }
  ) => () => void;
  subscribeFields: (
    names: AllPathsKeys<Values>[],
    cb: () => void,
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

export const useFieldContext = <Values = any>(): InternalFormContext<Values> => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error('Can not find FormContext. Please make sure you wrap Field under Form.');
  }

  return context;
};

export const useFieldState = <Values = any>(
  name: AllPathsKeys<Values>,
  mask: SubscribeMaskOptions = {
    errors: true,
    touched: true,
    validated: true,
    validating: true,
    warnings: true
  }
) => {
  const context = useFieldContext<Values>();

  const { getInternalHooks } = context as unknown as InternalFormInstance<Values>;

  const { subscribeField } = getInternalHooks();

  const state = context.getField(name);
  // eslint-disable-next-line react/hook-use-state
  const [_, forceUpdate] = useState({});

  if (!context) {
    throw new Error('Can not find FormContext. Please make sure you wrap Field under Form.');
  }

  useEffect(() => {
    const unregister = subscribeField(
      name,
      () => {
        flushSync(() => {
          forceUpdate({});
        });
      },
      {
        mask: toMask(mask)
      }
    );

    return () => {
      unregister();
    };
  }, [context, name]);

  return state;
};

export const useFieldsState = <Values = any>(
  form: FormInstance<Values>,
  names: AllPathsKeys<Values>[],
  opts?: {
    includeChildren?: boolean;
    mask?: SubscribeMaskOptions;
  }
) => {
  const state = form.getFields(names);

  const { getInternalHooks } = form as unknown as InternalFormInstance<Values>;

  const { subscribeFields } = getInternalHooks();

  const {
    includeChildren,
    mask = {
      errors: true,
      touched: true,
      validated: true,
      validating: true,
      warnings: true
    }
  } = opts || {};

  // eslint-disable-next-line react/hook-use-state
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    const unregister = subscribeFields(
      names.length ? names : ([''] as AllPathsKeys<Values>[]),
      () => {
        flushSync(() => {
          forceUpdate({});
        });
      },
      {
        includeChildren,
        mask: toMask(mask)
      }
    );

    // 只监听传入的字段
    return unregister;
  }, []);

  return state;
};

export const useFieldError = <Values = any>(name: AllPathsKeys<Values>) => {
  const state = useFieldState<Values>(name, { errors: true });

  return state.errors;
};

export const useFieldErrors = <Values = any>(
  form: FormInstance<Values>,
  names: AllPathsKeys<Values>[] = []
): Record<AllPathsKeys<Values>, string[]> => {
  const state = useFieldsState<Values>(form, names, { mask: { errors: true } });

  const errors = state.reduce(
    (acc, field) => {
      acc[field.name] = field.errors;
      return acc;
    },
    {} as Record<AllPathsKeys<Values>, string[]>
  );

  return errors as Record<AllPathsKeys<Values>, string[]>;
};

function useWatch<Values, T extends AllPathsKeys<Values>>(
  form: FormInstance<Values>,
  name: T,
  includeChildren?: boolean
): PathToDeepType<Values, T>;

function useWatch<Values, const T extends AllPathsKeys<Values>[]>(
  form: FormInstance<Values>,
  names: T
): ShapeFromPaths<Values, T>;

function useWatch<Values = any, const T extends AllPathsKeys<Values>[] = AllPathsKeys<Values>[]>(
  form: FormInstance<Values>
): ShapeFromPaths<Values, T>;

function useWatch<Values = any>(
  form: FormInstance<Values>,
  names?: AllPathsKeys<Values>[] | AllPathsKeys<Values>,
  includeChildren?: boolean
) {
  const namesArray = names ? toArray(names) : [];

  const nameIsArray = isArray(names) || !names;

  useFieldsState<Values>(form, namesArray, { includeChildren: includeChildren || !names, mask: { value: true } });

  return nameIsArray ? form.getFieldsValue(namesArray) : form.getFieldValue(names);
}

export { useWatch };
