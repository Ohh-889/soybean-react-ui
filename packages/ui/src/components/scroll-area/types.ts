import type {
  ScrollAreaProps as _ScrollAreaProps,
  ScrollAreaScrollbarProps as _ScrollAreaScrollbarProps,
  ScrollAreaThumbProps as _ScrollAreaThumbProps,
  ScrollAreaViewportProps as _ScrollAreaViewportProps
} from '@radix-ui/react-scroll-area';
import type { BaseNodeProps, ClassValue } from '@/types/other';

import type { ScrollAreaSlots } from './scroll-area-variants';

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
