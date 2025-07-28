import type { ToggleProps as _ToggleProps } from '@radix-ui/react-toggle';

import type { BaseNodeProps } from '@/types/other';

import type { ToggleVariant } from './toggle-variants';

export interface ToggleProps extends BaseNodeProps<_ToggleProps> {
  variant?: ToggleVariant;
}
