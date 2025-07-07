import type {
  ButtonShadow,
  ButtonShape,
  ButtonVariant,
  ThemeColor,
  ThemeOrientation,
  ThemeSize
} from '@skyroc-ui/variants';

import type { BaseProps, PrimitiveProps } from '../../types/other';

export interface ButtonProps extends PrimitiveProps, BaseProps<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  asIconButton?: boolean;
  color?: ThemeColor;
  fitContent?: boolean;
  leading?: React.ReactNode;
  loading?: boolean;
  shadow?: ButtonShadow;
  shape?: ButtonShape;
  size?: ThemeSize;
  trailing?: React.ReactNode;
  variant?: ButtonVariant;
}

export interface ButtonGroupProps extends BaseProps<React.HTMLAttributes<HTMLDivElement>> {
  orientation?: ThemeOrientation;
}

export type { ButtonShadow, ButtonShape, ButtonVariant };
