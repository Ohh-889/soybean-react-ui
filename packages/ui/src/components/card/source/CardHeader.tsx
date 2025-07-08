import { cardVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { CardHeaderProps } from '../type';

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
