import type {
  DropdownMenuArrowProps as _DropdownMenuArrowProps,
  DropdownMenuCheckboxItemProps as _DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps as _DropdownMenuContentProps,
  DropdownMenuGroupProps as _DropdownMenuGroupProps,
  DropdownMenuItemIndicatorProps as _DropdownMenuItemIndicatorProps,
  DropdownMenuItemProps as _DropdownMenuItemProps,
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

import type { BaseComponentProps, BaseNodeProps, ClassValue, ThemeSize } from '@/types/other';

import type { MenuSlots } from './dropdown-menu-variants';

export type DropdownMenuClassNames = Partial<Record<MenuSlots, ClassValue>>;

// Label
export interface DropdownMenuLabelProps extends BaseNodeProps<_DropdownMenuLabelProps> {
  classNames?: Pick<DropdownMenuClassNames, 'itemIcon' | 'label'>;
  leading?: ReactNode;
  trailing?: ReactNode;
}

// Item
export interface DropdownMenuItemProps extends BaseNodeProps<_DropdownMenuItemProps> {
  classNames?: Pick<DropdownMenuClassNames, 'itemIcon' | 'shortcut'>;
  leading?: ReactNode;
  shortcut?: string | string[];
  trailing?: ReactNode;
}

// Indicator
export type DropdownMenuItemIndicatorProps = BaseNodeProps<_DropdownMenuItemIndicatorProps>;

export type DropdownMenuSeparatorProps = BaseNodeProps<_DropdownMenuSeparatorProps>;

// SubTrigger
export interface DropdownMenuSubTriggerProps extends BaseNodeProps<_DropdownMenuSubTriggerProps> {
  classNames?: Pick<DropdownMenuClassNames, 'itemIcon' | 'subTriggerIcon'>;
  leading?: ReactNode;
  trailing?: ReactNode;
  trailingIcon?: ReactNode;
}

// MenuShortcut
export type DropdownMenuShortcutProps = BaseComponentProps<'div'> & {
  value?: string | string[];
};

export type DropdownMenuContentProps = BaseNodeProps<_DropdownMenuContentProps>;

export type DropdownMenuSubContentProps = BaseNodeProps<_DropdownMenuSubContentProps>;

export interface DropdownMenuItemOption extends Omit<DropdownMenuItemProps, 'children'> {
  label?: ReactNode;
  type?: 'item';
}

export interface DropdownMenuLabelOption extends Omit<DropdownMenuLabelProps, 'children'> {
  label?: ReactNode;
  type: 'label';
}

export interface DropdownMenuSeparatorOption extends Omit<DropdownMenuSeparatorProps, 'children'> {
  type: 'separator';
}

export interface DropdownMenuSubOption extends Omit<DropdownMenuSubTriggerProps, 'children'> {
  children: DropdownMenuOptionData[];
  label?: ReactNode;
  subContentProps?: _DropdownMenuSubContentProps;
  subProps?: _DropdownMenuSubProps;
  type: 'sub';
}

// MenuOptionData
export type DropdownMenuOptionData =
  | DropdownMenuItemOption
  | DropdownMenuLabelOption
  | DropdownMenuSeparatorOption
  | DropdownMenuSubOption;

export interface DropdownMenuCommonProps {
  classNames?: DropdownMenuClassNames;
  size?: ThemeSize;
}

export interface DropdownMenuPortalContentProps
  extends Pick<_DropdownMenuPortalProps, 'container' | 'forceMount'>,
    Omit<DropdownMenuContentProps, 'forceMount'> {
  arrowClass?: ClassValue;
  forceMountContent?: true;
  forceMountPortal?: true;
  showArrow?: boolean;
}

// Checkbox
export interface DropdownMenuCheckboxItemProps extends BaseNodeProps<_DropdownMenuCheckboxItemProps> {
  classNames?: Pick<DropdownMenuClassNames, 'item' | 'itemIndicator' | 'shortcut'>;
  indicatorIcon?: ReactNode;
  leading?: ReactNode;
  shortcut?: string | string[];
  trailing?: ReactNode;
}

export type DropdownMenuCheckboxGroupItemProps =
  | DropdownMenuLabelOption
  | DropdownMenuSeparatorOption
  | (Omit<DropdownMenuCheckboxItemProps, 'children'> & {
      label?: ReactNode;
    });

export interface DropdownMenuCheckboxGroupProps
  extends DropdownMenuCommonProps,
    BaseNodeProps<_DropdownMenuGroupProps> {
  checks?: string[];
  items: DropdownMenuCheckboxGroupItemProps[];
  onChecksChange?: (checks: string[]) => void;
}

export interface DropdownMenuCheckboxProps
  extends Omit<DropdownMenuCheckboxGroupProps, 'dir'>,
    BaseNodeProps<_DropdownMenuProps> {
  contentProps?: Omit<DropdownMenuContentProps, 'arrowClass' | 'className'>;
}

// Radio
export interface DropdownMenuRadioItemProps extends BaseNodeProps<_DropdownMenuRadioItemProps> {
  classNames?: Pick<DropdownMenuClassNames, 'item' | 'itemIndicator' | 'radioIndicatorIcon' | 'shortcut'>;
  indicatorIcon?: ReactNode;
  leading?: ReactNode;
  shortcut?: string | string[];
  trailing?: ReactNode;
}

export type DropdownMenuRadioGroupItemProps =
  | DropdownMenuLabelOption
  | DropdownMenuSeparatorOption
  | (Omit<DropdownMenuRadioItemProps, 'children'> & {
      label?: ReactNode;
    });

export interface DropdownMenuRadioGroupProps
  extends DropdownMenuCommonProps,
    BaseNodeProps<_DropdownMenuRadioGroupProps> {
  items: DropdownMenuRadioGroupItemProps[];
}

export interface DropdownMenuRadioProps
  extends Omit<DropdownMenuRadioGroupProps, 'dir'>,
    BaseNodeProps<_DropdownMenuProps> {
  contentProps?: Omit<DropdownMenuContentProps, 'arrowClass' | 'className'>;
}

export type DropdownMenuArrowProps = BaseNodeProps<_DropdownMenuArrowProps>;

export interface DropdownMenuProps extends BaseNodeProps<_DropdownMenuProps> {
  children?: ReactNode;
  classNames?: DropdownMenuClassNames;
  contentProps?: Omit<DropdownMenuPortalContentProps, 'children'>;
  items: DropdownMenuOptionData[];
}

export interface DropdownMenuOptionProps extends DropdownMenuCommonProps {
  item: DropdownMenuOptionData;
}
