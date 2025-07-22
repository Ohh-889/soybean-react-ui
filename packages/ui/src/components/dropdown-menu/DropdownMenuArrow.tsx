import { Arrow } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuArrowProps } from './types';

const DropdownMenuArrow = forwardRef<ComponentRef<typeof Arrow>, DropdownMenuArrowProps>((props, ref) => {
  const { className, ...rest } = props;

  const { arrow } = menuVariants();

  const mergedCls = cn(arrow(), className);

  return (
    <Arrow
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

DropdownMenuArrow.displayName = 'DropdownMenuArrow';

export default DropdownMenuArrow;
