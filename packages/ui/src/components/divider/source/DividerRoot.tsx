import { Root } from '@radix-ui/react-separator';
import { cn, dividerVariants } from '@soybean-react-ui/variants';
import React from 'react';

import type { DividerRootProps } from '../types';

const DividerRoot = React.forwardRef<HTMLDivElement, DividerRootProps>((props, ref) => {
  const { border, className, orientation, ...rest } = props;

  const { root } = dividerVariants({ border, orientation });

  const mergedCls = cn(root(), className);

  return (
    <Root
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

DividerRoot.displayName = 'DividerRoot';

export default DividerRoot;
