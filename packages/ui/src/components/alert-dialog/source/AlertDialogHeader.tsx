import { cn, dialogVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AlertDialogHeaderProps } from '../types';

const AlertDialogHeader = forwardRef<HTMLDivElement, AlertDialogHeaderProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { header } = dialogVariants({ size });

  const mergedClass = cn(header(), className);
  return (
    <div
      {...rest}
      className={mergedClass}
      ref={ref}
    />
  );
});

AlertDialogHeader.displayName = 'AlertDialogHeader';

export default AlertDialogHeader;
