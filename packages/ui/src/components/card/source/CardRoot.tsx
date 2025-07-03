import { cardVariants, cn } from '@skyroc-ui/variants';
import React, { useMemo } from 'react';

import type { CardRootProps } from '../type';

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
