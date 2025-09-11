import type { ReactNode } from 'react';
import type { InternalFieldProps } from 'skyroc-form';

import type { BaseProps } from '@/types/other';

export type FormFieldProps<Values = any> = InternalFieldProps<Values> &
  BaseProps<{
    description?: string;
    error?: string;
    label?: ReactNode;
    required?: boolean;
  }>;
