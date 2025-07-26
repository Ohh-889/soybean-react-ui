import type { ContentProps, DialogProps } from 'vaul';

import type { BaseComponentProps, BaseNodeProps, ClassValue, ThemeSize } from '@/types/other';

import type {
  DialogCloseProps,
  DialogDescriptionProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogTitleProps
} from '../dialog';
import type { DialogSlots } from '../dialog/dialog-variants';

import type { DrawerSlots } from './drawer-variants';

export type DrawerClassNames = Partial<Record<DrawerSlots | DialogSlots, ClassValue>>;

export type DrawerContentProps = BaseNodeProps<ContentProps> & {
  classNames?: Pick<DrawerClassNames, 'content' | 'contentBody' | 'knob' | 'overlay'>;
};

export type DrawerContentBodyProps = BaseComponentProps<'div'>;

export type DrawerFooterProps = BaseComponentProps<'div'>;

export type DrawerKnobProps = BaseComponentProps<'div'>;

export type DrawerOverlayProps = Omit<DialogOverlayProps, 'component'>;

export type DrawerHeaderProps = DialogHeaderProps;

export type DrawerDescriptionProps = Omit<DialogDescriptionProps, 'component'>;

export type DrawerTitleProps = Omit<DialogTitleProps, 'component'>;

export type DrawerCloseProps = Omit<DialogCloseProps, 'component'>;

export type DrawerProps = DialogProps & {
  classNames?: DrawerClassNames;
  contentProps?: DrawerContentProps;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  showClose?: boolean;
  size?: ThemeSize;
  title?: React.ReactNode;
  trigger?: React.ReactNode;
};
