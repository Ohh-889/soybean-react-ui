import type {
  TooltipArrowProps as _TooltipArrowProps,
  TooltipContentProps as _TooltipContentProps,
  TooltipProps as _TooltipProps
} from '@radix-ui/react-tooltip';

import type { BaseNodeProps, ClassValue, ThemeAlign, ThemeSide } from '@/types/other';

import type { TooltipSlots } from './tooltip-variants';

export type TooltipClassNames = Partial<Record<TooltipSlots, ClassValue>>;

export interface TooltipContentProps extends BaseNodeProps<_TooltipContentProps> {}

export interface TooltipArrowProps extends BaseNodeProps<_TooltipArrowProps> {}

export interface TooltipProps extends BaseNodeProps<_TooltipProps> {
  classNames?: TooltipClassNames;
  content: React.ReactNode;
  contentProps?: Omit<TooltipContentProps, 'children' | 'className'>;
  showArrow?: boolean;
}

export type TooltipSide = ThemeSide;

export type TooltipAlign = ThemeAlign;
