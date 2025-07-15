import { Root } from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { scrollAreaVariants } from './scroll-area-variants';
import type { ScrollAreaRootProps } from './types';

const ScrollAreaRoot = forwardRef<React.ElementRef<typeof Root>, ScrollAreaRootProps>((props, ref) => {
  const { className, ...rest } = props;

  const { root } = scrollAreaVariants();

  const mergedCls = cn(root(), className);

  return (
    <Root
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

ScrollAreaRoot.displayName = 'ScrollAreaRoot';

export default ScrollAreaRoot;
