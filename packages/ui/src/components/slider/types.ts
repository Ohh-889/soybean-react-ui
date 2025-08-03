import type {
  SliderProps as _SliderProps,
  SliderRangeProps as _SliderRangeProps,
  SliderThumbProps as _SliderThumbProps,
  SliderTrackProps as _SliderTrackProps
} from '@radix-ui/react-slider';

import type { BaseNodeProps, ClassValue, ThemeColor } from '@/types/other';

import type { SliderSlots } from './slider-variants';

export interface SliderRangeProps extends BaseNodeProps<_SliderRangeProps> {
  color?: ThemeColor;
}

export interface SliderRootProps extends BaseNodeProps<_SliderProps> {}

export interface SliderThumbProps extends BaseNodeProps<_SliderThumbProps> {
  color?: ThemeColor;
}

export interface SliderTrackProps extends BaseNodeProps<_SliderTrackProps> {
  color?: ThemeColor;
}

export type SliderClassNames = Partial<Record<SliderSlots, ClassValue>>;

export interface SliderProps extends Omit<SliderRootProps, 'children'> {
  classNames?: SliderClassNames;
  color?: ThemeColor;
}
