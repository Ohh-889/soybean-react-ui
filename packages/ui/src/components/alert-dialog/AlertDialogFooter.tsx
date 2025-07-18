import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { dialogVariants } from './alert-dialog-variants';
import type { AlertDialogFooterProps } from './types';

const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { footer } = dialogVariants({ size });

  const mergedClass = cn(footer(), className);
  return (
    <div
      {...rest}
      className={mergedClass}
      ref={ref}
    />
  );
});

AlertDialogFooter.displayName = 'AlertDialogFooter';

export default AlertDialogFooter;
