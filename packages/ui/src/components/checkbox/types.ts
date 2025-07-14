import type {
  CheckboxIndicatorProps as _CheckboxIndicatorProps,
  CheckboxProps as _CheckboxRootProps
} from '@radix-ui/react-checkbox';
import type { CheckboxSlots } from '@soybean-react-ui/variants';

import type { BaseComponentProps, BaseNodeProps, ClassValue, ThemeColor } from '../../types';

export type CheckboxUi = Partial<Record<CheckboxSlots, ClassValue>>;

export interface CheckboxControlProps extends BaseNodeProps<_CheckboxRootProps> {
  color?: ThemeColor;
}

export interface CheckboxIndicatorProps extends BaseNodeProps<_CheckboxIndicatorProps> {}

export interface CheckboxRootProps extends BaseComponentProps<'div'> {}

export interface CheckboxProps extends CheckboxControlProps {
  classNames?: CheckboxUi;
  forceMountIndicator?: true;
}
