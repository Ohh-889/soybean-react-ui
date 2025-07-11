import type {
  AlertDialogContentProps as _AlertDialogContentProps,
  AlertDialogDescriptionProps as _AlertDialogDescriptionProps,
  AlertDialogOverlayProps as _AlertDialogOverlayProps,
  AlertDialogPortalProps as _AlertDialogPortalProps,
  AlertDialogProps as _AlertDialogProps,
  AlertDialogTitleProps as _AlertDialogTitleProps
} from '@radix-ui/react-alert-dialog';
import type { DialogSlots, ThemeColor } from '@soybean-react-ui/variants';

import type { BaseComponentProps, BaseNodeProps, ClassValue } from '../../types/other';

export type AlertDialogUi = Partial<Record<DialogSlots, ClassValue>> & {
  icon?: string;
};

export type AlertType = Extract<ThemeColor, 'destructive' | 'info' | 'success' | 'warning'>;

export type AlertDialogContentProps = BaseNodeProps<_AlertDialogContentProps>;

export type AlertDialogDescriptionProps = BaseNodeProps<_AlertDialogDescriptionProps>;

export type AlertDialogFooterProps = BaseComponentProps<'div'>;

export type AlertDialogHeaderProps = BaseComponentProps<'div'>;

export type AlertDialogOverlayProps = BaseNodeProps<_AlertDialogOverlayProps>;

export type AlertDialogTitleProps = BaseNodeProps<_AlertDialogTitleProps>;

export type AlertDialogProps = BaseNodeProps<_AlertDialogProps> &
  AlertDialogContentProps &
  _AlertDialogPortalProps & {
    classNames?: AlertDialogUi;
    description?: string;
    disabledPortal?: boolean;
    footer?: React.ReactNode;
    forceMountOverlay?: true;
    forceMountPortal?: true;
    icon?: React.ReactNode;
    title?: React.ReactNode;
    trigger?: React.ReactNode;
    type?: AlertType;
  };
