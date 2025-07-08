import type { ButtonShadow, ButtonShape, ButtonVariant, ThemeColor, ThemeOrientation } from '@soybean-react-ui/variants';

import type { BaseNodeProps, PrimitiveProps } from '../../types/other';

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
