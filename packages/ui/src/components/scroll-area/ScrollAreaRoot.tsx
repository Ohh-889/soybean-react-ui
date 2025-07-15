import { Root } from '@radix-ui/react-scroll-area';
import { cn, scrollAreaVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

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
