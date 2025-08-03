'use client';

import type { Content } from '@radix-ui/react-dialog';
import { Portal, Root, Trigger } from '@radix-ui/react-dialog';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import DialogClose from './DialogClose';
import DialogContent from './DialogContent';
import DialogDescription from './DialogDescription';
import DialogFooter from './DialogFooter';
import DialogHeader from './DialogHeader';
import DialogOverlay from './DialogOverlay';
import DialogTitle from './DialogTitle';
import type { DialogProps } from './types';

const Dialog = forwardRef<ComponentRef<typeof Content>, DialogProps>((props, ref) => {
  const {
    children,
    className,
    classNames,
    contentComponent: ContentComponent = DialogContent,
    contentProps,
    defaultOpen,
    description,
    footer,
    modal,
    onOpenChange,
    open,
    size,
    title,
    trigger
  } = props;

  return (
    <Root
      data-slot="dialog-root"
      defaultOpen={defaultOpen}
      modal={modal}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger
        asChild
        data-slot="dialog-trigger"
      >
        {trigger}
      </Trigger>

      <Portal data-slot="dialog-portal">
        <DialogOverlay className={classNames?.overlay} />

        <ContentComponent
          {...contentProps}
          className={className || classNames?.content}
          ref={ref}
          size={size}
        >
          <DialogHeader
            className={classNames?.header}
            size={size}
          >
            <DialogTitle
              className={classNames?.title}
              size={size}
            >
              {title}
            </DialogTitle>

            {description && (
              <DialogDescription
                className={classNames?.description}
                size={size}
              >
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <DialogClose
            className={classNames?.close}
            size={size}
            onClick={() => {
              onOpenChange?.(false);
            }}
          />

          {children}

          {footer && (
            <DialogFooter
              className={classNames?.footer}
              size={size}
            >
              {footer}
            </DialogFooter>
          )}
        </ContentComponent>
      </Portal>
    </Root>
  );
});

Dialog.displayName = 'Dialog';

export default Dialog;
