import type {
  SelectContentProps as _SelectContentProps,
  SelectItemProps as _SelectItemProps,
  SelectLabelProps as _SelectLabelProps,
  SelectProps as _SelectProps,
  SelectSeparatorProps as _SelectSeparatorProps,
  SelectTriggerProps as _SelectTriggerProps,
  SelectValueProps as _SelectValueProps
} from '@radix-ui/react-select';
import type { ReactNode } from 'react';

import type { BaseNodeProps, ClassValue, PropsSlot, ThemeSize } from '@/types/other';

import type { SelectSlots } from './select-variants';

export type SelectClassNames = Partial<Record<SelectSlots, ClassValue>>;

export interface SelectContentProps extends BaseNodeProps<_SelectContentProps> {
  classNames?: Pick<SelectClassNames, 'content' | 'scrollDownButton' | 'scrollUpButton' | 'viewport'>;
  scrollDownButton?: React.ReactNode;
  scrollUpButton?: React.ReactNode;
}

export interface SelectItemProps extends BaseNodeProps<_SelectItemProps>, PropsSlot {
  classNames?: Pick<SelectClassNames, 'item' | 'itemIndicator'>;
  indicatorIcon?: React.ReactNode;
}

export interface SelectLabelProps extends BaseNodeProps<_SelectLabelProps> {}

export interface SelectSeparatorProps extends BaseNodeProps<_SelectSeparatorProps> {}

export interface SelectTriggerProps
  extends BaseNodeProps<_SelectTriggerProps>,
    Pick<_SelectValueProps, 'placeholder'>,
    PropsSlot {
  classNames?: Pick<SelectClassNames, 'selectedValue' | 'trigger' | 'triggerIcon'>;
  triggerIcon?: React.ReactNode;
}

export type SelectOptionItemData = Omit<SelectItemProps, 'children'> & {
  label?: ReactNode;
  type?: 'item';
};

export type SelectSeparatorOptionData = SelectSeparatorProps & {
  type: 'separator';
};

export type SelectGroupOptionData = Omit<SelectLabelProps, 'children'> & {
  children: SelectOptionItemData[];
  label?: ReactNode;
  type?: 'group';
};

export type SelectOptionData = SelectOptionItemData | SelectGroupOptionData | SelectSeparatorOptionData;

export interface SelectOptionProps extends Pick<SelectItemProps, 'indicatorIcon'> {
  classNames?: SelectClassNames;
  item: SelectOptionData;
  size?: ThemeSize;
}

export interface SelectProps
  extends BaseNodeProps<Omit<_SelectProps, 'children'>>,
    Pick<SelectItemProps, 'indicatorIcon'> {
  classNames?: SelectClassNames;
  contentProps?: Omit<SelectContentProps, 'children'>;
  items: SelectOptionData[];
  size?: ThemeSize;
  triggerProps?: SelectTriggerProps;
}
