'use client';

import { useId } from 'react';
import type { AllPathsKeys } from 'skyroc-form';
import { Field, useFieldError } from 'skyroc-form';

import { cn } from '@/lib/utils';

import FormLabel from '../label/Label';

import { formVariants } from './form-variants';
import type { FormFieldProps } from './types';

const FormField = <Values = any,>(props: FormFieldProps<Values>) => {
  const { children, className, description, label, name, size, ...rest } = props;

  const id = useId();

  const errors = useFieldError<Values, AllPathsKeys<Values>>(name);

  const hasError = errors.length > 0;

  const formItemId = `${id}-form-item`;
  const formDescriptionId = `${id}-form-item-description`;
  const formMessageId = `${id}-form-item-message`;

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
        data-error={hasError}
        data-slot="form-label"
        htmlFor={id}
        size={size}
      >
        {label}
      </FormLabel>

      <Field
        {...rest}
        aria-describedby={!hasError ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={hasError}
        id={id}
        name={name}
      >
        {children}
      </Field>

      {description && (
        <p
          className={mergedCls.description}
          id={formDescriptionId}
        >
          {description}
        </p>
      )}

      {hasError && (
        <p
          className={mergedCls.message}
          id={formMessageId}
        >
          {errors[0]}
        </p>
      )}
    </div>
  );
};

export default FormField;
