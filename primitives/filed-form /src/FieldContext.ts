'use client';
/* eslint-disable no-bitwise */

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { AllPaths, PathToDeepType, ShapeFromPaths } from 'skyroc-type-utils';

import type { ChangeMask, SubscribeMaskOptions } from './form-core/event';
import { toMask } from './form-core/event';
import type { Action, Middleware } from './form-core/middleware';
import type { FieldEntity } from './form-core/types';
import type { ValidateMessages } from './form-core/validate';
import type { Rule } from './form-core/validation';
import type { FormState } from './types';
import type { Meta } from './types/shared-types';

export interface ValuesOptions<Values = any> {
  getFieldsValue: <K extends AllPaths<Values, number>[]>(...name: K) => ShapeFromPaths<Values, K>;
  getFieldValue: <T extends AllPaths<Values>>(name: T) => PathToDeepType<Values, T>;
  setFieldsValue: (values: Partial<Values>) => void;
  setFieldValue: <T extends AllPaths<Values>>(name: T, value: PathToDeepType<Values, T>) => void;
}

export interface StateOptions<Values = any> {
  getField: <T extends AllPaths<Values>>(name: T) => Meta<T, PathToDeepType<Values, T>>;
  getFieldError: (name: AllPaths<Values>) => string[];
  getFieldsError: (...name: AllPaths<Values>[]) => Record<AllPaths<Values>, string[]>;
  getFieldsWarning: (...name: AllPaths<Values>[]) => Record<AllPaths<Values>, string[]>;
  getFieldWarning: (name: AllPaths<Values>) => string[];
  getFormState: () => FormState;
  isFieldsTouched: (...name: AllPaths<Values>[]) => boolean;
  isFieldsValidating: (...name: AllPaths<Values>[]) => boolean;
  isFieldTouched: (name: AllPaths<Values>) => boolean;
  isFieldValidating: (name: AllPaths<Values>) => boolean;
  subscribeField: <T extends AllPaths<Values>>(
    name: T,
    cb: (value: PathToDeepType<Values, T>, key: T, all: Values, fired: ChangeMask) => void,
    opt?: { includeChildren?: boolean; mask?: ChangeMask }
  ) => () => void;
}

export interface OperationOptions<Values = any> {
  resetFields: (...names: AllPaths<Values>[]) => void;
  submit: () => void;
  use: (mw: Middleware) => void;
  validateField: (name: AllPaths<Values>) => Promise<boolean>;
  validateFields: (...names: AllPaths<Values>[]) => Promise<boolean>;
}

export interface RegisterCallbackOptions<Values = any> {
  onFieldsChange?: (
    changedFields: Meta<AllPaths<Values>, PathToDeepType<Values, AllPaths<Values>>>[],
    allFields: Meta<AllPaths<Values>, PathToDeepType<Values, AllPaths<Values>>>[]
  ) => void;

  onFinish?: (values: Values) => void;

  onValuesChange?: (changedValues: Partial<Values>, values: Values) => void;
}

export interface InternalCallbacks<Values = any> {
  destroyForm: (clearOnDestroy?: boolean) => void;
  setCallbacks: (callbacks: RegisterCallbackOptions<Values>) => void;
  setInitialValues: (values: Partial<Values>) => void;
  setPreserve: (preserve: boolean) => void;
  setValidateMessages: (messages: ValidateMessages) => void;
}

export interface InternalFieldHooks<Values = any> {
  dispatch: (action: Action) => void;
  getInitialValue: (name: AllPaths<Values>) => PathToDeepType<Values, AllPaths<Values>>;
  registerField: (entity: FieldEntity) => () => void;
  setFieldRules: (name: AllPaths<Values>, rules?: Rule[]) => void;
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
  name: AllPaths<Values>,
  mask: SubscribeMaskOptions = {
    errors: true,
    validated: true,
    validating: true,
    warnings: true
  }
) => {
  const context = useFieldContext<Values>();

  const state = useRef(context.getField(name));

  // eslint-disable-next-line react/hook-use-state
  const [_, forceUpdate] = useState(0);

  if (!context) {
    throw new Error('Can not find FormContext. Please make sure you wrap Field under Form.');
  }

  console.log('context', toMask(mask));

  useEffect(() => {
    const unregister = context.subscribeField(
      name,
      () => {
        flushSync(() => {
          state.current = context.getField(name);
          forceUpdate(prev => prev + 1);
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

  return state.current;
};

export const useFieldErrors = <Values = any>(name: AllPaths<Values>) => {
  const state = useFieldState<Values>(name, { errors: true });

  console.log('state', state);

  return state.errors;
};
