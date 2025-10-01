'use client';

import { useId } from 'react';
import type { AllPathsKeys } from 'skyroc-form';
import { Field, useFieldError } from 'skyroc-form';

import FormDescription from './FormDescription';
import FormItem from './FormItem';
import FormLabel from './FormLable';
import FormMessage from './FormMessage';
import type { FormFieldProps } from './types';

const FormField = <Values = any,>(props: FormFieldProps<Values>) => {
  const {
    children,
    className,
    classNames,
    component: Component = Field,
    description,
    label,
    name,
    size,
    ...rest
  } = props;

  const id = useId();

  const errors = useFieldError<Values, AllPathsKeys<Values>>(name);

  const hasError = errors.length > 0;

  const formItemId = `${id}-form-item`;
  const formDescriptionId = `${id}-form-item-description`;
  const formMessageId = `${id}-form-item-message`;

  return (
    <FormItem
      className={className}
      size={size}
    >
      <FormLabel
        className={classNames?.label}
        error={hasError}
        htmlFor={formItemId}
        size={size}
      >
        {label}
      </FormLabel>

      <Component
        {...rest}
        aria-describedby={!hasError ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={hasError}
        id={id}
        name={name}
      >
        {children}
      </Component>

      {description && (
        <FormDescription
          className={classNames?.description}
          id={formDescriptionId}
        >
          {description}
        </FormDescription>
      )}

      {hasError && (
        <FormMessage
          className={classNames?.message}
          id={formMessageId}
        >
          {errors[0]}
        </FormMessage>
      )}
    </FormItem>
  );
};

export default FormField;
