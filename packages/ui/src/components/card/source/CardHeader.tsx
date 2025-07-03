import { cardVariants, cn } from '@skyroc-ui/variants';
import React, { useMemo } from 'react';

import type { CardHeaderProps } from '../type';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
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
