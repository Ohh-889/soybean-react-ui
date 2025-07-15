import { Content } from '@radix-ui/react-alert-dialog';
import { cn, dialogVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

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
