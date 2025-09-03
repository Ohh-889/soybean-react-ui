'use client';

import { useId } from 'react';
import { Field, useFieldErrors } from 'skyroc-form';

import { cn } from '@/lib/utils';

import FormLabel from '../label/Label';

import { formVariants } from './form-variants';
import type { FormFieldProps } from './types';

const FormField = <Values = any,>(props: FormFieldProps<Values>) => {
  const { children, className, description, label, name, size, ...rest } = props;

  const id = useId();

  const errors = useFieldErrors<Values>(name);

  const {
    description: descriptionCls,
    item,
    label: labelCls,
    message
  } = formVariants({ error: errors.length > 0, size });

  const mergedCls = {
    description: cn(descriptionCls(), className),
    item: cn(item(), className),
    label: cn(labelCls()),
    message: cn(message(), className)
  };

  return (
    <div className={mergedCls.item}>
      <FormLabel
        className={mergedCls.label}
        htmlFor={id}
        size={size}
      >
        {label}
      </FormLabel>

      <Field
        {...rest}
        id={id}
        name={name}
      >
        {children}
      </Field>

      {description && (
        <p
          className={mergedCls.description}
          id={id}
        >
          {description}
        </p>
      )}

      {errors.length > 0 && (
        <p
          className={mergedCls.message}
          id={id}
        >
          {errors[0]}
        </p>
      )}
    </div>
  );
};

export default FormField;
