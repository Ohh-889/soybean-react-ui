import type { ProgressProps as _ProgressProps } from '@radix-ui/react-progress';

import type { BaseNodeProps, ClassValue, ThemeColor } from '@/types/other';

import type { ProgressSlots } from './progress-variants';

export type ProgressClassNames = Partial<Record<ProgressSlots, ClassValue>>;

export interface ProgressProps extends BaseNodeProps<Omit<_ProgressProps, 'children'>> {
  classNames?: ProgressClassNames;
  color?: ThemeColor;
}
