import { Cancel } from '@radix-ui/react-alert-dialog';
import { forwardRef } from 'react';

import { Button, type ButtonProps } from '../button';

const AlertDialogCancel = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = 'plain', ...rest } = props;

  return (
    <Cancel asChild>
      <Button
        {...rest}
        ref={ref}
        variant={variant}
      />
    </Cancel>
  );
});

AlertDialogCancel.displayName = 'AlertDialogCancel';

export default AlertDialogCancel;
