import { Arrow } from '@radix-ui/react-popover';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { popoverVariants } from './popover-varianst';
import type { PopoverArrowProps } from './types';

const PopoverArrow = forwardRef<ComponentRef<typeof Arrow>, PopoverArrowProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { arrow } = popoverVariants({ size });

  const mergedCls = cn(arrow(), className);

  return (
    <Arrow
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
