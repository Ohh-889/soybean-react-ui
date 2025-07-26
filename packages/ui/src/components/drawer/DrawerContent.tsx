import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { Content, Portal } from 'vaul';

import { cn } from '@/lib/utils';

import DrawerContentBody from './DrawerContentBody';
import DrawerKnob from './DrawerKnob';
import DrawerOverlay from './DrawerOverlay';
import { drawerVariants } from './drawer-variants';
import type { DrawerContentProps } from './types';

const DrawerContent = forwardRef<ComponentRef<typeof Content>, DrawerContentProps>((props, ref) => {
  const { children, className, classNames, size, ...rest } = props;

  const { content } = drawerVariants({ size });

  const mergedCls = cn(content(), className, classNames?.content);

  return (
    <Portal>
      <DrawerOverlay className={classNames?.overlay} />

      <Content
        className={mergedCls}
        data-slot="drawer-content"
        ref={ref}
        {...rest}
      >
        <DrawerContentBody className={classNames?.contentBody}>
          <DrawerKnob className={classNames?.knob} />

          {children}
        </DrawerContentBody>
      </Content>
    </Portal>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
