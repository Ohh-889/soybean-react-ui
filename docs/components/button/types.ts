import type { BaseNodeProps, PrimitiveProps, ThemeColor, ThemeOrientation } from '@/types/other';

import type { IconProps } from '../icon';

import type { ButtonShadow, ButtonShape, ButtonVariant } from './button-variants';

export interface ButtonProps extends PrimitiveProps, BaseNodeProps<React.ButtonHTMLAttributes<HTMLButtonElement>> {
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

export interface ButtonIconProps extends ButtonProps {
  icon?: IconProps['icon'];
  iconProps?: Omit<IconProps, 'icon'>;
}

export type { ButtonShadow, ButtonShape, ButtonVariant };
