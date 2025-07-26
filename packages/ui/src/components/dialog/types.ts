import type {
  DialogCloseProps as _DialogCloseProps,
  DialogContentProps as _DialogContentProps,
  DialogDescriptionProps as _DialogDescriptionProps,
  DialogOverlayProps as _DialogOverlayProps,
  // eslint-disable-next-line sort-imports
  DialogPortalProps,
  DialogProps as _DialogProps,
  DialogTitleProps as _DialogTitleProps
} from '@radix-ui/react-dialog';
import type { ComponentType } from 'react';

import type { BaseComponentProps, BaseNodeProps, ClassValue } from '@/types/other';

import type { DialogSlots } from './dialog-variants';

export type DialogClassNames = Partial<Record<DialogSlots, ClassValue>>;

export interface DialogCloseProps extends BaseNodeProps<_DialogCloseProps> {
  component?: ComponentType<_DialogCloseProps>;
}

export interface DialogContentProps extends BaseNodeProps<_DialogContentProps> {
  component?: ComponentType<_DialogContentProps>;
}

export interface DialogDescriptionProps extends BaseNodeProps<_DialogDescriptionProps> {
  component?: ComponentType<_DialogDescriptionProps>;
}

export interface DialogFooterProps extends BaseComponentProps<'footer'> {}

export interface DialogHeaderProps extends BaseComponentProps<'header'> {}

export interface DialogOverlayProps extends BaseNodeProps<_DialogOverlayProps> {
  component?: ComponentType<_DialogOverlayProps>;
}

export interface DialogTitleProps extends BaseNodeProps<_DialogTitleProps> {
  component?: ComponentType<_DialogTitleProps>;
}

export type DialogProps = BaseNodeProps<_DialogProps> & {
  classNames?: DialogClassNames;
  contentProps?: DialogContentProps;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  title?: React.ReactNode;
  trigger?: React.ReactNode;
};

export { DialogPortalProps };
