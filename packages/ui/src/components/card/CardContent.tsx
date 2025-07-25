import React from 'react';

import { cn } from '@/lib/utils';

import { cardVariants } from './card-variants';
import type { CardContentProps } from './types';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>((props, ref) => {
  const { className, flexHeight, size, ...rest } = props;

  const { content } = cardVariants({ flexHeight, size });

  const mergedCls = cn(content(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

CardContent.displayName = 'CardContent';
