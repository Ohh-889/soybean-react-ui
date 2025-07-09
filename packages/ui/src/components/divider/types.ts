import type { SeparatorProps as _SeparatorProps } from '@radix-ui/react-separator';
import type { DividerBorder, DividerSlots } from '@soybean-react-ui/variants';

import type { ThemeAlign, ThemeOrientation } from '../../types';
import type { BaseNodeProps, ClassValue, PropsSlot } from '../../types/other';

export interface DividerRootProps extends BaseNodeProps<_SeparatorProps> {
  border?: DividerBorder;
}

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
