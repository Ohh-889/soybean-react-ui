import type { AlertSlots, AlertVariant, ClassValue, ThemeColor } from '@soybean-react-ui/variants';

import type { BaseNodeProps, PropsSlot } from '../../types/other';

export type AlertDescriptionProps = BaseNodeProps<React.ComponentProps<'div'>>;

export interface AlertRootProps extends BaseNodeProps<React.ComponentProps<'div'>> {
  color?: ThemeColor;
  variant?: AlertVariant;
}

export type AlertTitleProps = BaseNodeProps<React.ComponentProps<'div'>>;

export type AlertWrapperProps = BaseNodeProps<React.ComponentProps<'div'>>;

export type AlertIconProps = BaseNodeProps<React.ComponentProps<'div'>> & {
  color?: ThemeColor;
};

export type AlertCloseProps = BaseNodeProps<React.ComponentProps<'button'>>;

export type AlertUi = Partial<Record<AlertSlots, ClassValue>>;

export interface AlertProps extends Omit<AlertRootProps, 'title'>, PropsSlot {
  classNames?: AlertUi;
  closable?: boolean;
  close?: boolean;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

export type { AlertVariant };
