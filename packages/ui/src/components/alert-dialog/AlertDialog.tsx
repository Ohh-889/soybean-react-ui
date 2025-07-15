import type { Content } from '@radix-ui/react-alert-dialog';
import { AlertDialog as AlertDialogRoot, Portal, Trigger } from '@radix-ui/react-alert-dialog';
import { Slot } from '@radix-ui/react-slot';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react';
import { forwardRef } from 'react';

import AlertDialogContent from './AlertDialogContent';
import AlertDialogDescription from './AlertDialogDescription';
import AlertDialogFooter from './AlertDialogFooter';
import AlertDialogHeader from './AlertDialogHeader';
import AlertDialogOverlay from './AlertDialogOverlay';
import AlertDialogTitle from './AlertDialogTitle';
import type { AlertDialogProps, AlertType } from './types';

const iconRecord: Record<AlertType, React.ReactNode> = {
  destructive: <CircleX className="text-destructive" />,
  info: <Info className="text-info" />,
  success: <CircleCheck className="text-success" />,
  warning: <CircleAlert className="text-warning" />
};

const AlertDialog = forwardRef<React.ElementRef<typeof Content>, AlertDialogProps>((props, ref) => {
  const {
    children,
    className,
    classNames,
    description,
    footer,
    forceMountOverlay,
    forceMountPortal,
    icon,
    size,
    title,
    trigger,
    type,
    ...rest
  } = props;

  return (
    <AlertDialogRoot {...props}>
      <Trigger asChild>{trigger}</Trigger>

      <Portal forceMount={forceMountPortal}>
        <AlertDialogOverlay
          className={classNames?.overlay}
          forceMount={forceMountOverlay}
        />

        <AlertDialogContent
          {...rest}
          className={className || classNames?.content}
          ref={ref}
          size={size}
        >
          <AlertDialogHeader
            className={classNames?.header}
            size={size}
          >
            <AlertDialogTitle
              className={classNames?.title}
              size={size}
            >
              {icon || (type && <Slot className={classNames?.icon || ''}>{iconRecord[type]}</Slot>)}
              {title}
            </AlertDialogTitle>

            {description && (
              <AlertDialogDescription
                className={classNames?.description}
                size={size}
              >
                {description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          {children}

          {footer && (
            <AlertDialogFooter
              className={classNames?.footer}
              size={size}
            >
              {footer}
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </Portal>
    </AlertDialogRoot>
  );
});

AlertDialog.displayName = 'AlertDialog';

export default AlertDialog;
