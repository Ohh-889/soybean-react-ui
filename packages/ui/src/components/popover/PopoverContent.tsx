import { Content } from '@radix-ui/react-popover';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { popoverVariants } from './popover-varianst';
import type { PopoverContentProps } from './types';

const PopoverContent = forwardRef<ComponentRef<typeof Content>, PopoverContentProps>((props, ref) => {
  const { avoidCollisions = true, className, sideOffset = 5, size, ...rest } = props;

  const { content } = popoverVariants({ size });

  const mergedCls = cn(content(), className);

  return (
    <Content
      avoidCollisions={avoidCollisions}
      className={mergedCls}
      sideOffset={sideOffset}
      {...rest}
      ref={ref}
    />
  );
});

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
