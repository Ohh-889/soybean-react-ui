import { RadioItem } from '@radix-ui/react-dropdown-menu';
import { CircleSmall } from 'lucide-react';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import DropdownMenuItemIndicator from './DropdownMenuItemIndicator';
import DropdownMenuShortcut from './DropdownMenuShortcut';
import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuRadioItemProps } from './types';

const DropdownMenuRadioItem = forwardRef<ComponentRef<typeof RadioItem>, DropdownMenuRadioItemProps>((props, ref) => {
  const { children, className, classNames, indicatorIcon, leading, shortcut, size, trailing, ...rest } = props;

  const { radioIndicatorIcon, radioItem } = menuVariants({ size });

  const mergedCls = cn(radioItem(), className || classNames?.item);

  const mergedIndicatorCls = cn(radioIndicatorIcon(), classNames?.radioIndicatorIcon);

  return (
    <RadioItem
      className={mergedCls}
      ref={ref}
      {...rest}
    >
      <DropdownMenuItemIndicator
        className={classNames?.itemIndicator}
        size={size}
      >
        {indicatorIcon || <CircleSmall className={mergedIndicatorCls} />}
      </DropdownMenuItemIndicator>

      {leading}

      {children}

      {trailing}

      {shortcut && (
        <DropdownMenuShortcut
          className={classNames?.shortcut}
          size={size}
          value={shortcut}
        />
      )}
    </RadioItem>
  );
});

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export default DropdownMenuRadioItem;
