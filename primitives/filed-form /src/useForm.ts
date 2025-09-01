'use client';

import { useRef } from 'react';

import type { FormInstance } from './FieldContext';
import CreateFromStore from './createStore';

const useForm = <Values = any>(form?: FormInstance<Values>): readonly [FormInstance<Values>] => {
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

export default useForm;
