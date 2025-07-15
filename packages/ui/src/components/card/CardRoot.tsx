import React from 'react';

import { cn } from '@/lib/utils';

import { cardVariants } from './card-variants';
import type { CardRootProps } from './types';

export const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>((props, ref) => {
  const { className, size, split, ...rest } = props;

  const { root } = cardVariants({ size, split });

  const mergedCls = cn(root(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

CardRoot.displayName = 'CardRoot';
