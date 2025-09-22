// src/form-core/types.ts

import type { NamePath } from '../utils/util';

import type { ChangeMask } from './event';

export type Store = Record<string, any>;

export type StoreValue = any;

export type ValidateTrigger = 'onChange' | 'onBlur' | 'onSubmit' | string;

export interface Rule {
  debounceMs?: number;
  max?: number;
  maxLength?: number;
  message?: string;
  min?: number;
  minLength?: number;
  pattern?: RegExp;
  required?: boolean;
  validateTrigger?: ValidateTrigger | ValidateTrigger[];
  validator?: (value: any, allValues: Store) => string | Promise<string>;
  warningOnly?: boolean;
  whitespace?: boolean; // When true, whitespace-only strings are treated as "empty"
}

export interface FieldEntity {
  changeValue: (value: StoreValue, key: string, all: Store, fired: ChangeMask) => void;
  initialValue?: any;
  name: NamePath;
  preserve?: boolean;
}

export interface ValidateMessages {
  required?: string;
}

export interface Callbacks<Values = any> {
  onFieldsChange?: (
    changed: Array<{
      errors: string[];
      name: NamePath;
      touched: boolean;
      validating: boolean;
      value: any;
      warnings: string[];
    }>,
    all: Array<{
      errors: string[];
      name: NamePath;
      touched: boolean;
      validating: boolean;
      value: any;
      warnings: string[];
    }>
  ) => void;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (err: any) => void;
  onValuesChange?: (changed: Partial<Values>, all: Values) => void;
}

export type ChangeTag =
  | 'errors'
  | 'meta' // touched/dirty changes
  | 'mount' // validating state changes
  | 'unmount' // error/warning changes
  | 'validating'
  | 'value'; // field register/unregister
