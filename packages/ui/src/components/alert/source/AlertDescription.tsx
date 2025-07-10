import { alertVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AlertDescriptionProps } from '../types';

const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { description } = alertVariants({ size });

  const mergedCls = cn(description(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

AlertDescription.displayName = 'AlertDescription';

export default AlertDescription;
