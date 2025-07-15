import { Viewport } from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { scrollAreaVariants } from './scroll-area-variants';
import type { ScrollAreaViewportProps } from './types';

const ScrollAreaViewport = forwardRef<React.ElementRef<typeof Viewport>, ScrollAreaViewportProps>((props, ref) => {
  const { className, ...rest } = props;

  const { viewport } = scrollAreaVariants();

  const mergedCls = cn(viewport(), className);

  return (
    <Viewport
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

ScrollAreaViewport.displayName = 'ScrollAreaViewport';

export default ScrollAreaViewport;
