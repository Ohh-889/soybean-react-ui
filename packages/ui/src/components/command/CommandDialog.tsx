import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot } from '../dialog';

import type { CommandDialogProps } from './types';

const CommandDialog = (props: CommandDialogProps) => {
  const { children, className, classNames, defaultOpen, onOpenChange, open, ...rest } = props;

  return (
    <DialogRoot
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay className={classNames?.overlay} />

        <DialogContent
          {...rest}
          className={className || classNames?.content}
        >
          <DialogClose className={classNames?.close} />

          {children}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

export default CommandDialog;
