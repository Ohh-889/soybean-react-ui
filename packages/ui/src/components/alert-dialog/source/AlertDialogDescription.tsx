import { Description } from '@radix-ui/react-alert-dialog';
import { cn, dialogVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AlertDialogDescriptionProps } from '../types';

const AlertDialogDescription = forwardRef<React.ElementRef<typeof Description>, AlertDialogDescriptionProps>(
  (props, ref) => {
    const { className, size, ...rest } = props;

    const { description } = dialogVariants({ size });

    const mergedClass = cn(description(), className);
    return (
      <Description
        {...rest}
        className={mergedClass}
        ref={ref}
      />
    );
  }
);

AlertDialogDescription.displayName = 'AlertDialogDescription';

export default AlertDialogDescription;
