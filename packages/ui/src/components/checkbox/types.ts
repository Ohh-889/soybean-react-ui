import type {
  CheckboxIndicatorProps as _CheckboxIndicatorProps,
  CheckboxProps as _CheckboxRootProps
} from '@radix-ui/react-checkbox';
import type { CheckboxSlots } from '@soybean-react-ui/variants';

import type { BaseComponentProps, BaseNodeProps, ClassValue, ThemeColor } from '../../types';

export type CheckboxUi = Partial<Record<CheckboxSlots, ClassValue>>;

export type CheckboxControlProps = BaseNodeProps<_CheckboxRootProps> & {
  color?: ThemeColor;
};

export type CheckboxIndicatorProps = BaseNodeProps<_CheckboxIndicatorProps>;

export type CheckboxRootProps = BaseComponentProps<'div'>;

export type CheckboxProps = CheckboxControlProps & {
  classNames?: CheckboxUi;
  forceMountIndicator?: true;
};
