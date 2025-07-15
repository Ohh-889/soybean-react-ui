import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { alertVariants } from './alert-variants';
import type { AlertWrapperProps } from './types';

const AlertWrapper = forwardRef<HTMLDivElement, AlertWrapperProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { wrapper } = alertVariants({ size });

  const mergedCls = cn(wrapper(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

AlertWrapper.displayName = 'AlertWrapper';

export default AlertWrapper;
