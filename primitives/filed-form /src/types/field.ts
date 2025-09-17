import type { NamePath } from '../utils/util';

import type { Store, StoreValue } from './formStore';

export interface Meta {
  errors: string[];
  name: NamePath;
  touched: boolean;
  validated: boolean;
  validating: boolean;
  warnings: string[];
}

export interface InternalFieldData extends Meta {
  value: StoreValue;
}

/**
 * Used by `setFields` config
 */
export interface FieldData extends Omit<InternalFieldData, 'name'> {
  name: NamePath;
}

// >>>>>> Info
interface ValueUpdateInfo {
  source: 'external' | 'internal';
  type: 'valueUpdate';
}

interface ValidateFinishInfo {
  type: 'validateFinish';
}

interface ResetInfo {
  type: 'reset';
}

interface RemoveInfo {
  type: 'remove';
}

interface SetFieldInfo {
  data: FieldData;
  type: 'setField';
}

interface DependenciesUpdateInfo {
  /**
   * Contains all the related `InternalNamePath[]`.
   * a <- b <- c : change `a`
   * relatedFields=[a, b, c]
   */
  relatedFields: NamePath[];
  type: 'dependenciesUpdate';
}

export type NotifyInfo =
  | ValueUpdateInfo
  | ValidateFinishInfo
  | ResetInfo
  | RemoveInfo
  | SetFieldInfo
  | DependenciesUpdateInfo;

export type ValuedNotifyInfo = NotifyInfo & {
  store: Store;
};

export interface ValidateOptions {
  /** Validate when a field is dirty (validated or touched) */
  dirty?: boolean;
  /**
   * Recursive validate. It will validate all the name path that contains the provided one.
   * e.g. [['a']] will validate ['a'] , ['a', 'b'] and ['a', 1].
   */
  recursive?: boolean;
  /**
   * Validate only and not trigger UI and Field status update
   */
  validateOnly?: boolean;
}

export interface FieldEntity {
  changeValue: (value: any) => void;
  initialValue?: StoreValue;
  name?: NamePath;
  preserve: boolean;
}
