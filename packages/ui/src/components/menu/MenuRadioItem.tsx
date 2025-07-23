import { RadioItem as _RadioItem } from '@radix-ui/react-dropdown-menu';
import { CircleSmall } from 'lucide-react';
import type { ComponentRef } from 'react';
import { forwardRef, isValidElement } from 'react';

import { withClassName } from '@/lib/compose-props';
import { cn } from '@/lib/utils';

import MenuShortcut from '../menu/MenuShortcut';

import DropdownMenuItemIndicator from './MenuItemIndicator';
import { menuVariants } from './menu-variants';
import type { MenuRadioItemProps } from './types';

const MenuRadioItem = forwardRef<ComponentRef<typeof _RadioItem>, MenuRadioItemProps>((props, ref) => {
  const {
    children,
    className,
    classNames,
    component: RadioItem = _RadioItem,
    indicatorComponent: IndicatorComponent = DropdownMenuItemIndicator,
    indicatorIcon,
    leading,
    shortcut,
    size,
    trailing,
    ...rest
  } = props;

  const { itemIcon, radioIndicatorIcon, radioItem } = menuVariants({ size });

  const mergedCls = cn(radioItem(), className || classNames?.item);

  const mergedIndicatorCls = cn(radioIndicatorIcon(), classNames?.radioIndicatorIcon);

  return (
    <RadioItem
      className={mergedCls}
      ref={ref}
      {...rest}
    >
      <IndicatorComponent
        className={classNames?.itemIndicator}
        size={size}
      >
        {indicatorIcon || <CircleSmall className={mergedIndicatorCls} />}
      </IndicatorComponent>

      {isValidElement(leading) ? withClassName(leading, itemIcon()) : leading}

      {children}

      {trailing}

      {shortcut && (
        <MenuShortcut
          className={classNames?.shortcut}
          size={size}
          value={shortcut}
        />
      )}
    </RadioItem>
  );
});

MenuRadioItem.displayName = 'MenuRadioItem';

export default MenuRadioItem;
