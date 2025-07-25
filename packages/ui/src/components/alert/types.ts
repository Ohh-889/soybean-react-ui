import type { BaseNodeProps, ClassValue, PropsSlot, ThemeColor } from '@/types/other';

import type { AlertSlots, AlertVariant } from './alert-variants';

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

export type AlertClassNames = Partial<Record<AlertSlots, ClassValue>>;

export interface AlertProps extends Omit<AlertRootProps, 'title'>, PropsSlot {
  classNames?: AlertClassNames;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

export type { AlertVariant };
