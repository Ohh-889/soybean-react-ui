import type { NamePath } from '../utils/util';

import type { StoreValue } from './formStore';

export type EventArgs = any[];

export interface Meta<T extends NamePath, V extends StoreValue> {
  errors: string[];
  name: T;
  touched: boolean;
  validated: boolean;
  validating: boolean;
  value: V;
  warnings: string[];
}
