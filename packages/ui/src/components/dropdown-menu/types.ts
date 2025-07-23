import type {
  DropdownMenuCheckboxItemProps as _DropdownMenuCheckboxItemProps,
  DropdownMenuGroupProps as _DropdownMenuGroupProps,
  DropdownMenuItemIndicatorProps as _DropdownMenuItemIndicatorProps,
  DropdownMenuLabelProps as _DropdownMenuLabelProps,
  DropdownMenuPortalProps as _DropdownMenuPortalProps,
  DropdownMenuProps as _DropdownMenuProps,
  DropdownMenuRadioGroupProps as _DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps as _DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps as _DropdownMenuSeparatorProps,
  DropdownMenuSub as _DropdownMenuSub,
  DropdownMenuSubContentProps as _DropdownMenuSubContentProps,
  DropdownMenuSubProps as _DropdownMenuSubProps,
  DropdownMenuSubTriggerProps as _DropdownMenuSubTriggerProps
} from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';

import type { BaseNodeProps } from '@/types/other';

import type {
  MenuArrowProps,
  MenuCheckboxGroupProps,
  MenuCheckboxItemProps,
  MenuCommonProps,
  MenuContentProps,
  MenuItemIndicatorProps,
  MenuItemProps,
  MenuLabelProps,
  MenuOptionProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuSubContentProps,
  MenuSubTriggerProps
} from '../menu/types';

export type DropdownMenuArrowProps = Omit<MenuArrowProps, 'component'>;

export type DropdownMenuContentProps = Omit<MenuContentProps, 'arrowComponent' | 'component' | 'portalComponent'>;

// Item
export type DropdownMenuItemProps = Omit<MenuItemProps, 'component'>;

// Label
export type DropdownMenuLabelProps = Omit<MenuLabelProps, 'component'>;

export type DropdownMenuOptionProps = Omit<
  MenuOptionProps,
  'component' | 'labelComponent' | 'separatorComponent' | 'subComponent' | 'subContentComponent' | 'subTriggerComponent'
>;

// Indicator
export type DropdownMenuItemIndicatorProps = Omit<MenuItemIndicatorProps, 'component'>;

export type DropdownMenuSeparatorProps = Omit<MenuSeparatorProps, 'component'>;

export type DropdownMenuSubContentProps = Omit<MenuSubContentProps, 'component' | 'groupComponent' | 'portalComponent'>;

export type DropdownMenuSubTriggerProps = Omit<MenuSubTriggerProps, 'component'>;

// Checkbox
export type DropdownMenuCheckboxItemProps = Omit<MenuCheckboxItemProps, 'component' | 'indicatorComponent'>;

export type DropdownMenuCheckboxGroupProps = Omit<
  MenuCheckboxGroupProps,
  'component' | 'groupComponent' | 'labelComponent' | 'separatorComponent'
>;

export interface DropdownMenuCheckboxProps
  extends Omit<DropdownMenuCheckboxGroupProps, 'dir'>,
    BaseNodeProps<_DropdownMenuProps> {
  contentProps?: Omit<DropdownMenuContentProps, 'arrowClass' | 'className'>;
}

// Radio
export type DropdownMenuRadioItemProps = Omit<MenuRadioItemProps, 'component' | 'indicatorComponent'>;

export type DropdownMenuRadioGroupProps = Omit<
  MenuRadioGroupProps,
  'component' | 'groupComponent' | 'labelComponent' | 'separatorComponent'
>;

export interface DropdownMenuRadioProps
  extends Omit<DropdownMenuRadioGroupProps, 'dir'>,
    BaseNodeProps<_DropdownMenuProps> {
  contentProps?: Omit<DropdownMenuContentProps, 'arrowClass' | 'className'>;
}

export interface DropdownMenuProps extends BaseNodeProps<_DropdownMenuProps>, MenuCommonProps {
  children?: ReactNode;
  contentProps?: Omit<DropdownMenuContentProps, 'children'>;
  items: DropdownMenuOptionProps['item'][];
}
