import { Thumb } from '@radix-ui/react-scroll-area';
import { cn, scrollAreaVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { ScrollAreaThumbProps } from './types';

const ScrollAreaScrollbar = forwardRef<React.ElementRef<typeof Thumb>, ScrollAreaThumbProps>((props, ref) => {
  const { className, ...rest } = props;

  const { thumb } = scrollAreaVariants();

  const mergedCls = cn(thumb(), className);

  return (
    <Thumb
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';

export default ScrollAreaScrollbar;
