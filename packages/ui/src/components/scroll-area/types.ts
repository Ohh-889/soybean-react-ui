import type {
  ScrollAreaProps as _ScrollAreaProps,
  ScrollAreaScrollbarProps as _ScrollAreaScrollbarProps,
  ScrollAreaViewportProps as _ScrollAreaViewportProps
} from '@radix-ui/react-scroll-area';
import type { ClassValue, ClassValueProp, ScrollAreaSlots } from '@soybean-react-ui/variants';

import type { BaseNodeProps } from '../../types/other';

export type ScrollAreaUi = Partial<Record<ScrollAreaSlots, ClassValue>>;

export type ScrollAreaRootProps = BaseNodeProps<_ScrollAreaProps>;

export type ScrollAreaScrollbarProps = BaseNodeProps<_ScrollAreaScrollbarProps>;

export type ScrollAreaThumbProps = ClassValueProp;

export type ScrollAreaViewportProps = BaseNodeProps<_ScrollAreaViewportProps>;

export interface ScrollAreaProps
  extends ScrollAreaRootProps,
    Omit<ScrollAreaScrollbarProps, 'dir'>,
    Omit<ScrollAreaViewportProps, 'dir'> {
  classNames?: ScrollAreaUi;
}
