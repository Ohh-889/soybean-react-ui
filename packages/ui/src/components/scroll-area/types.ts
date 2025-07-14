import type {
  ScrollAreaProps as _ScrollAreaProps,
  ScrollAreaScrollbarProps as _ScrollAreaScrollbarProps,
  ScrollAreaViewportProps as _ScrollAreaViewportProps,
  ScrollAreaThumbProps as _ScrollAreaThumbProps
} from '@radix-ui/react-scroll-area';
import type { ClassValue, ClassValueProp, ScrollAreaSlots } from '@soybean-react-ui/variants';

import type { BaseNodeProps } from '../../types/other';

export type ScrollAreaUi = Partial<Record<ScrollAreaSlots, ClassValue>>;

export interface ScrollAreaRootProps extends BaseNodeProps<_ScrollAreaProps> {}

export interface ScrollAreaScrollbarProps extends BaseNodeProps<_ScrollAreaScrollbarProps> {}

export interface ScrollAreaThumbProps extends BaseNodeProps<_ScrollAreaThumbProps> {}

export interface ScrollAreaViewportProps extends BaseNodeProps<_ScrollAreaViewportProps> {}

export interface ScrollAreaProps
  extends ScrollAreaRootProps,
    Omit<ScrollAreaScrollbarProps, 'dir'>,
    Omit<ScrollAreaViewportProps, 'dir'> {
  classNames?: ScrollAreaUi;
}
