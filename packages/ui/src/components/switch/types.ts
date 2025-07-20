import type { SwitchProps as _SwitchRootProps, SwitchThumbProps as _SwitchThumbProps } from '@radix-ui/react-switch';

import type { BaseNodeProps, ClassValue, ThemeColor } from '@/types/other';

import type { SwitchSlots } from './switch-varianst';

export interface SwitchRootProps extends BaseNodeProps<_SwitchRootProps> {
  color?: ThemeColor;
}

export type SwitchThumbProps = BaseNodeProps<_SwitchThumbProps>;

export type ClassNames = Partial<Record<SwitchSlots, ClassValue>>;

export interface SwitchProps extends SwitchRootProps {
  classNames?: ClassNames;
}
