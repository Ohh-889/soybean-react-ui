import type { ComputedFieldProps, FieldProps } from '@skyroc/form';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import type { BaseNodeProps, ClassValue } from '@/types/other';

import type { LabelProps } from '../label/types';

import type { FormSlots } from './form-variants';

type FormClassNames = Partial<Record<FormSlots, ClassValue>>;

export interface FormDescriptionProps extends BaseNodeProps<ComponentProps<'p'>> {}

export interface FormItemProps extends BaseNodeProps<ComponentProps<'div'>> {}

export interface FormLabelProps extends LabelProps {
  error?: boolean;
}

export interface FormMessageProps extends BaseNodeProps<ComponentProps<'p'>> {
  error?: string[];
}

type FormSharedProps = BaseNodeProps<{
  classNames?: FormClassNames;
  description?: string;
  error?: string;
  label?: ReactNode;
}>;

export type FormFieldProps<Values = any> = FieldProps<Values> &
  FormSharedProps & {
    component?: ElementType;
  };

export type FormComputedFieldProps<Values = any> = ComputedFieldProps<Values> & FormSharedProps;
