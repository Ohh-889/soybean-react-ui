import { cardVariants, cn } from '@soybean-react-ui/variants';
import React from 'react';

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
