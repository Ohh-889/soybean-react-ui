import { Separator } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuSeparatorProps } from './types';

const DropdownMenuSeparator = forwardRef<ComponentRef<typeof Separator>, DropdownMenuSeparatorProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { separator } = menuVariants({ size });

  const mergedCls = cn(separator(), className);

  return (
    <Separator
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export default DropdownMenuSeparator;
