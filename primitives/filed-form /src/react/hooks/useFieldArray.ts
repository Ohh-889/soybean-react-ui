'use client';

import type { ArrayKeys } from 'skyroc-type-utils';

import type { FormInstance, InternalFormInstance } from './FieldContext';
import { useFieldContext } from './FieldContext';

export type ArrayFieldItem = {
  key: string; // 稳定的 key
  name: string; // 字段路径，比如 "users.0"
};

export function useArrayField<Values = any>(name: ArrayKeys<Values>, form?: FormInstance<Values>) {
  const contextForm = useFieldContext();

  const formInstance = form ?? contextForm;

  if (!formInstance) {
    throw new Error('Can not find FormContext. Please make sure you wrap Field under Form or provide a form instance.');
  }

  const { arrayOp } = formInstance as unknown as InternalFormInstance<Values>;

  return arrayOp(name);
}
