'use client';

import { useRef } from 'react';

import CreateFromStore from '../../form-core/createStore';

import type { FormInstance } from './FieldContext';

export const useForm = <Values = any>(form?: FormInstance<Values>): readonly [FormInstance<Values>] => {
  const formRef = useRef<FormInstance<Values> | null>(null);

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const internalForm = new CreateFromStore();

      formRef.current = internalForm.getForm() as any;
    }
  }

  return [formRef.current] as unknown as readonly [FormInstance<Values>];
};
