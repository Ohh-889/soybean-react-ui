import { Item } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import DropdownMenuShortcut from './DropdownMenuShortcut';
import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuItemProps } from './types';

const DropdownMenuItem = forwardRef<ComponentRef<typeof Item>, DropdownMenuItemProps>((props, ref) => {
  const { children, className, classNames, leading, shortcut, size, trailing, ...rest } = props;

  const { item } = menuVariants({ size });

  const mergedCls = cn(item(), className);

  return (
    <Item
      className={mergedCls}
      ref={ref}
      {...rest}
    >
      {leading}

      <span>{children}</span>

      {trailing}

      {shortcut && (
        <DropdownMenuShortcut
          className={classNames?.shortcut}
          size={size}
          value={shortcut}
        />
      )}
    </Item>
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';

export default DropdownMenuItem;
