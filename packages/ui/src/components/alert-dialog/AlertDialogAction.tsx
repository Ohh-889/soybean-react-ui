import { Action } from '@radix-ui/react-alert-dialog';
import { forwardRef } from 'react';

import { Button, type ButtonProps } from '../button';

const AlertDialogAction = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <Action asChild>
      <Button
        {...props}
        ref={ref}
      />
    </Action>
  );
});

AlertDialogAction.displayName = 'AlertDialogAction';

export default AlertDialogAction;
