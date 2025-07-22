import { ItemIndicator } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuItemIndicatorProps } from './types';

const DropdownMenuItemIndicator = forwardRef<ComponentRef<typeof ItemIndicator>, DropdownMenuItemIndicatorProps>(
  (props, ref) => {
    const { className, size, ...rest } = props;

    const { itemIndicator } = menuVariants({ size });

    const mergedCls = cn(itemIndicator(), className);

    return (
      <ItemIndicator
        className={mergedCls}
        ref={ref}
        {...rest}
      />
    );
  }
);

DropdownMenuItemIndicator.displayName = 'DropdownMenuItemIndicator';

export default DropdownMenuItemIndicator;
