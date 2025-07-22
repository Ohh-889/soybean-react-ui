import { CheckboxItem } from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import DropdownMenuItemIndicator from './DropdownMenuItemIndicator';
import DropdownMenuShortcut from './DropdownMenuShortcut';
import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuCheckboxItemProps } from './types';

const DropdownMenuCheckboxItem = forwardRef<ComponentRef<typeof CheckboxItem>, DropdownMenuCheckboxItemProps>(
  (props, ref) => {
    const { children, className, classNames, indicatorIcon, leading, shortcut, size, trailing, ...rest } = props;

    const { checkboxItem } = menuVariants({ size });

    const mergedCls = cn(checkboxItem(), className || classNames?.item);

    return (
      <CheckboxItem
        className={mergedCls}
        ref={ref}
        {...rest}
      >
        <DropdownMenuItemIndicator
          className={classNames?.itemIndicator}
          size={size}
        >
          {indicatorIcon || <Check />}
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
      </CheckboxItem>
    );
  }
);

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export default DropdownMenuCheckboxItem;
