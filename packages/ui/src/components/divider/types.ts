import type { SeparatorProps as _SeparatorProps } from '@radix-ui/react-separator';

import type { BaseNodeProps, ClassValue, PropsSlot, ThemeAlign, ThemeOrientation } from '@/types/other';

import type { DividerBorder, DividerSlots } from './divider-variants';

export interface DividerRootProps extends BaseNodeProps<_SeparatorProps> {
  border?: DividerBorder;
}

export type { DividerBorder };

export interface DividerLabelProps extends BaseNodeProps<React.ComponentProps<'span'>> {
  align?: ThemeAlign;
  orientation?: ThemeOrientation;
}

export type DividerUi = Partial<Record<DividerSlots, ClassValue>>;

export interface DividerProps
  extends DividerRootProps,
    Pick<DividerLabelProps, 'align' | 'orientation' | 'size'>,
    PropsSlot {
  classNames?: DividerUi;
}
