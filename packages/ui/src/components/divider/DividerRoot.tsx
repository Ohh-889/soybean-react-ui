import { Root } from '@radix-ui/react-separator';
import React from 'react';

import { cn } from '@/lib/utils';

import { dividerVariants } from './divider-variants';
import type { DividerRootProps } from './types';

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
