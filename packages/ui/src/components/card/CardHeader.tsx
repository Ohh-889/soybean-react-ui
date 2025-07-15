import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { cardVariants } from './card-variants';
import type { CardHeaderProps } from './types';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { header } = cardVariants({ size });

  const mergedCls = cn(header(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

CardHeader.displayName = 'CardHeader';
