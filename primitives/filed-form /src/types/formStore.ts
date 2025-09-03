import type { Meta } from './field';

export type StoreValue = any;

export type Store = Record<string, StoreValue>;

export type Callbacks = {
  onFieldsChange?: (changedFields: Meta[], allFields: Meta[]) => void;

  onFinish?: (values: Store) => void;

  onFinishFailed?: (errorInfo: any) => void;

  onValuesChange?: (changedValues: Partial<Store>, values: Store) => void;
};
