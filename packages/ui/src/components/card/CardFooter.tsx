import React from 'react';

import { cn } from '@/lib/utils';

import { cardVariants } from './card-variants';
import type { CardFooterProps } from './types';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { footer } = cardVariants({ size });

  const mergedCls = cn(footer(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

CardFooter.displayName = 'CardFooter';
