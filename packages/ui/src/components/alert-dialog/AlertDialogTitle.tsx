import { Title } from '@radix-ui/react-alert-dialog';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { dialogVariants } from './alert-dialog-variants';
import type { AlertDialogTitleProps } from './types';

const AlertDialogTitle = forwardRef<React.ElementRef<typeof Title>, AlertDialogTitleProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { title } = dialogVariants({ size });

  const mergedClass = cn(title(), className);
  return (
    <Title
      {...rest}
      className={mergedClass}
      ref={ref}
    />
  );
});

AlertDialogTitle.displayName = 'AlertDialogTitle';

export default AlertDialogTitle;
