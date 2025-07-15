import { Scrollbar } from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { scrollAreaVariants } from './scroll-area-variants';
import type { ScrollAreaScrollbarProps } from './types';

const ScrollAreaScrollbar = forwardRef<React.ElementRef<typeof Scrollbar>, ScrollAreaScrollbarProps>((props, ref) => {
  const { className, orientation, size, ...rest } = props;

  const { scrollbar } = scrollAreaVariants({ orientation, size });

  const mergedCls = cn(scrollbar(), className);

  return (
    <Scrollbar
      className={mergedCls}
      orientation={orientation}
      {...rest}
      ref={ref}
    />
  );
});

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';

export default ScrollAreaScrollbar;
