import type { BaseNodeProps, PrimitiveProps, ThemeColor, ThemeOrientation } from '@/types/other';

import type { ButtonShadow, ButtonShape, ButtonVariant } from './button-variants';

export interface ButtonProps extends PrimitiveProps, BaseNodeProps<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  asIconButton?: boolean;
  color?: ThemeColor;
  fitContent?: boolean;
  leading?: React.ReactNode;
  loading?: boolean;
  shadow?: ButtonShadow;
  shape?: ButtonShape;
  trailing?: React.ReactNode;
  variant?: ButtonVariant;
}

export interface ButtonGroupProps extends BaseNodeProps<React.HTMLAttributes<HTMLDivElement>> {
  orientation?: ThemeOrientation;
}

export type { ButtonShadow, ButtonShape, ButtonVariant };
