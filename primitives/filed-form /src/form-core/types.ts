/**
 * Core type definitions for the form system
 * Contains fundamental types used throughout the form implementation
 */

import type { NamePath } from '../utils/util';

import type { ChangeMask } from './event';

/**
 * Type representing the form's data store
 * A record where keys are field names and values are field values
 */
export type Store = Record<string, any>;

/**
 * Type representing any value that can be stored in a form field
 */
export type StoreValue = any;

/**
 * Interface representing a registered field entity in the form
 * Contains metadata and callbacks for field management
 */
export interface FieldEntity {
  /** Callback function triggered when field value changes */
  changeValue: (value: StoreValue, key: string, all: Store, fired: ChangeMask) => void;
  /** Initial value for the field */
  initialValue?: any;
  /** Field name path */
  name: NamePath;
  /** Whether to preserve field value after component unmount */
  preserve?: boolean;
}

/**
 * Interface defining form lifecycle callbacks
 * These callbacks are triggered at various points during form operations
 */
export interface Callbacks<Values = any> {
  /** Called when field metadata changes (errors, validation state, etc.) */
  onFieldsChange?: (changedFields: Meta<NamePath, StoreValue>[], allFields: Meta<NamePath, StoreValue>[]) => void;
  /** Called when form submission succeeds */
  onFinish?: (values: Values) => void;
  /** Called when form submission fails validation */
  onFinishFailed?: (err: any) => void;
  /** Called when form values change */
  onValuesChange?: (changed: Partial<Values>, all: Values) => void;
}

/**
 * Type for event arguments passed to form event handlers
 */
export type EventArgs = any[];

/**
 * Interface representing field metadata and state
 * Contains all information about a field's current state
 */
export interface Meta<T extends NamePath, V extends StoreValue> {
  /** Array of validation error messages */
  errors: string[];
  /** Field name path */
  name: T;
  /** Whether the field has been interacted with by the user */
  touched: boolean;
  /** Whether the field has completed validation */
  validated: boolean;
  /** Whether the field is currently being validated */
  validating: boolean;
  /** Current field value */
  value: V;
  /** Array of validation warning messages */
  warnings: string[];
}

/**
 * String-based change tags for field state changes
 * Used for categorizing different types of field changes
 */
export type ChangeTag =
  | 'errors' // Validation errors changed
  | 'meta' // Field metadata changed (touched/dirty)
  | 'mount' // Field component mounted
  | 'unmount' // Field component unmounted
  | 'validating' // Validation state changed
  | 'value'; // Field value changed
