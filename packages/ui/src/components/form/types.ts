import type { ReactNode } from 'react';
import type { FieldProps } from 'skyroc-form';

import type { BaseProps } from '@/types/other';

export type FormFieldProps<Values = any> = FieldProps<Values> &
  BaseProps<{
    description?: string;
    error?: string;
    label?: ReactNode;
    required?: boolean;
  }>;
