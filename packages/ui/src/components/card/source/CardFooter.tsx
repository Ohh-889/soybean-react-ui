import { cardVariants, cn } from '@soybean-react-ui/variants';
import React from 'react';

import type { CardFooterProps } from '../type';

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
