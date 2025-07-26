import { type ComponentRef, forwardRef } from 'react';
import type { Content } from 'vaul';
import { Root as _Root } from 'vaul';

import { DialogFooter, DialogHeader, DialogTrigger } from '../dialog';

import DrawerClose from './DrawerClose';
import DrawerContent from './DrawerContent';
import DrawerDescription from './DrawerDescription';
import DrawerTitle from './DrawerTitle';
import type { DrawerProps } from './types';

const Drawer = forwardRef<ComponentRef<typeof Content>, DrawerProps>((props, ref) => {
  const {
    children,
    classNames,
    contentProps,
    description,
    footer,
    shouldScaleBackground = true,
    showClose,
    size,
    title,
    trigger
  } = props;

  return (
    <_Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DrawerContent
        classNames={classNames}
        ref={ref}
        {...contentProps}
      >
        <DialogHeader
          className={classNames?.header}
          size={size}
        >
          <DrawerTitle
            className={classNames?.title}
            size={size}
          >
            {title}
          </DrawerTitle>

          <DrawerDescription
            className={classNames?.description}
            size={size}
          >
            {description}
          </DrawerDescription>
        </DialogHeader>

        {showClose && (
          <DrawerClose
            className={classNames?.close}
            size={size}
          />
        )}

        {children}

        {footer && (
          <DialogFooter
            className={classNames?.footer || '!flex-col-reverse'}
            size={size}
          >
            {footer}
          </DialogFooter>
        )}
      </DrawerContent>
    </_Root>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
