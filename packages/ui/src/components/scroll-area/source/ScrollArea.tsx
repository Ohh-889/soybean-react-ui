import { ScrollAreaCorner } from '@radix-ui/react-scroll-area';
import { cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { ScrollAreaProps } from '../types';

import ScrollAreaRoot from './ScrollAreaRoot';
import ScrollAreaScrollbar from './ScrollAreaScrollbar';
import ScrollAreaThumb from './ScrollAreaThumb';
import ScrollAreaViewport from './ScrollAreaViewport';

const ScrollArea = forwardRef<React.ElementRef<typeof ScrollAreaRoot>, ScrollAreaProps>((props, ref) => {
  const { children, className, classNames, forceMount, nonce, orientation, size, ...rest } = props;

  return (
    <ScrollAreaRoot
      className={className}
      {...rest}
      ref={ref}
    >
      <ScrollAreaViewport
        className={classNames?.viewport}
        nonce={nonce}
      >
        {children}
      </ScrollAreaViewport>

      <ScrollAreaScrollbar
        className={classNames?.scrollbar}
        forceMount={forceMount}
        orientation={orientation}
        size={size}
      >
        <ScrollAreaThumb className={classNames?.thumb} />
      </ScrollAreaScrollbar>

      <ScrollAreaCorner className={cn(classNames?.corner)} />
    </ScrollAreaRoot>
  );
});

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
