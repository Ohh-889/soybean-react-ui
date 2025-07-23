import type {
  ContextMenuCheckboxItemProps as _ContextMenuCheckboxItemProps,
  ContextMenuGroupProps as _ContextMenuGroupProps,
  ContextMenuItemIndicatorProps as _ContextMenuItemIndicatorProps,
  ContextMenuLabelProps as _ContextMenuLabelProps,
  ContextMenuPortalProps as _ContextMenuPortalProps,
  ContextMenuProps as _ContextMenuProps,
  ContextMenuRadioGroupProps as _ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps as _ContextMenuRadioItemProps,
  ContextMenuSeparatorProps as _ContextMenuSeparatorProps,
  ContextMenuSub as _ContextMenuSub,
  ContextMenuSubContentProps as _ContextMenuSubContentProps,
  ContextMenuSubProps as _ContextMenuSubProps,
  ContextMenuSubTriggerProps as _ContextMenuSubTriggerProps
} from '@radix-ui/react-context-menu';
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

export type ContextMenuArrowProps = Omit<MenuArrowProps, 'component'>;

export type ContextMenuContentProps = Omit<MenuContentProps, 'arrowComponent' | 'component' | 'portalComponent'>;

// Item
export type ContextMenuItemProps = Omit<MenuItemProps, 'component'>;

// Label
export type ContextMenuLabelProps = Omit<MenuLabelProps, 'component'>;

export type ContextMenuOptionProps = Omit<
  MenuOptionProps,
  'component' | 'labelComponent' | 'separatorComponent' | 'subComponent' | 'subContentComponent' | 'subTriggerComponent'
>;

// Indicator
export type ContextMenuItemIndicatorProps = Omit<MenuItemIndicatorProps, 'component'>;

export type ContextMenuSeparatorProps = Omit<MenuSeparatorProps, 'component'>;

export type ContextMenuSubContentProps = Omit<MenuSubContentProps, 'component' | 'groupComponent' | 'portalComponent'>;

export type ContextMenuSubTriggerProps = Omit<MenuSubTriggerProps, 'component'>;

// Checkbox
export type ContextMenuCheckboxItemProps = Omit<MenuCheckboxItemProps, 'component' | 'indicatorComponent'>;

export type ContextMenuCheckboxGroupProps = Omit<
  MenuCheckboxGroupProps,
  'component' | 'groupComponent' | 'labelComponent' | 'separatorComponent'
>;

export interface ContextMenuCheckboxProps
  extends Omit<ContextMenuCheckboxGroupProps, 'dir'>,
    BaseNodeProps<_ContextMenuProps> {
  contentProps?: Omit<ContextMenuContentProps, 'arrowClass' | 'className'>;
}

// Radio
export type ContextMenuRadioItemProps = Omit<MenuRadioItemProps, 'component' | 'indicatorComponent'>;

export type ContextMenuRadioGroupProps = Omit<
  MenuRadioGroupProps,
  'component' | 'groupComponent' | 'labelComponent' | 'separatorComponent'
>;

export interface ContextMenuRadioProps
  extends Omit<ContextMenuRadioGroupProps, 'dir'>,
    BaseNodeProps<_ContextMenuProps> {
  contentProps?: Omit<ContextMenuContentProps, 'arrowClass' | 'className'>;
}

export interface ContextMenuProps extends BaseNodeProps<_ContextMenuProps>, MenuCommonProps {
  children?: ReactNode;
  contentProps?: Omit<ContextMenuContentProps, 'children'>;
  items: ContextMenuOptionProps['item'][];
}
