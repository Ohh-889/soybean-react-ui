import { Label } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuLabelProps } from './types';

const DropdownMenuLabel = forwardRef<ComponentRef<typeof Label>, DropdownMenuLabelProps>((props, ref) => {
  const { children, className, classNames, leading, size, trailing, ...rest } = props;

  const { label } = menuVariants({ size });

  const mergedCls = cn(label(), className || classNames?.label);

  return (
    <Label
      className={mergedCls}
      ref={ref}
      {...rest}
    >
      {leading}

      {children}

      {trailing}
    </Label>
  );
});

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export default DropdownMenuLabel;
