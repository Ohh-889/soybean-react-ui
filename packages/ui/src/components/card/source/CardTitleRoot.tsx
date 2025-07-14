import { cardVariants, cn } from '@soybean-react-ui/variants';
import React from 'react';

import type { CardTitleRootProps } from '../types';

export const CardTitleRoot = React.forwardRef<HTMLDivElement, CardTitleRootProps>((props, ref) => {
  const { children, className, leading, size, trailing, ...rest } = props;

  const { titleRoot } = cardVariants({ size });

  const mergedCls = cn(titleRoot(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    >
      {leading}
      {children}
      {trailing}
    </div>
  );
});

CardTitleRoot.displayName = 'CardTitleRoot';
