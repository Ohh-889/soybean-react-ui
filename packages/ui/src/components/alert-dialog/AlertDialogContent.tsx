import { Content } from '@radix-ui/react-alert-dialog';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { dialogVariants } from './alert-dialog-variants';
import type { AlertDialogContentProps } from './types';

const AlertDialogContent = forwardRef<React.ElementRef<typeof Content>, AlertDialogContentProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { content } = dialogVariants({ size });

  const mergedClass = cn(content(), className);
  return (
    <Content
      {...rest}
      className={mergedClass}
      ref={ref}
    />
  );
});

AlertDialogContent.displayName = 'AlertDialogContent';

export default AlertDialogContent;
