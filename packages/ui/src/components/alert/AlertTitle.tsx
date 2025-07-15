import { alertVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AlertTitleProps } from './types';

const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { title } = alertVariants({ size });

  const mergedCls = cn(title(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

AlertTitle.displayName = 'AlertTitle';

export default AlertTitle;
