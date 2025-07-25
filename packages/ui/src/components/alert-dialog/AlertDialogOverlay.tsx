import { Overlay } from '@radix-ui/react-alert-dialog';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { dialogVariants } from './alert-dialog-variants';
import type { AlertDialogOverlayProps } from './types';

const AlertDialogOverlay = forwardRef<React.ElementRef<typeof Overlay>, AlertDialogOverlayProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { overlay } = dialogVariants({ size });

  const mergedClass = cn(overlay(), className);
  return (
    <Overlay
      {...rest}
      className={mergedClass}
      ref={ref}
    />
  );
});

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

export default AlertDialogOverlay;
