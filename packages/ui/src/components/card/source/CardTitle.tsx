import { cardVariants, cn } from '@skyroc-ui/variants';
import React from 'react';

import type { CardTitleProps } from '../type';

export const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { title } = cardVariants({ size });

  const mergedCls = cn(title(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

CardTitle.displayName = 'CardTitle';
