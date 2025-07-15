import type { BaseComponentProps, ClassValue, ThemeColor, ThemeSize } from '@/types/other';

import type { ChipPosition, ChipSlots } from './chip-variants';

export type ChipRootProps = BaseComponentProps<'div'>;

export interface ChipContentProps extends BaseComponentProps<'span'> {
  color?: ThemeColor;
  position?: ChipPosition;
  size?: ThemeSize;
}

export type ChipUi = Partial<Record<ChipSlots, ClassValue>>;

export interface ChipProps
  extends Omit<ChipRootProps, 'color' | 'content'>,
    Pick<ChipContentProps, 'color' | 'position' | 'size'> {
  classNames?: ChipUi;
  content?: React.ReactNode;
  open?: boolean;
}

export { ChipPosition };
