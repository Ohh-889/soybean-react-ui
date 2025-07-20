import type { Content } from '@radix-ui/react-popover';
import { Close, Portal, Root, Trigger } from '@radix-ui/react-popover';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import PopoverArrow from './PopoverArrow';
import PopoverContent from './PopoverContent';
import type { PopoverProps } from './types';

const PopoverUI = forwardRef<ComponentRef<typeof Content>, PopoverProps>((props, ref) => {
  const {
    arrowHeight,
    arrowWidth,
    children,
    className,
    classNames,
    closeIcon,
    container,
    defaultOpen,
    forceMountPortal,
    modal,
    onOpenChange,
    open,
    showArrow,
    size,
    trigger,
    ...rest
  } = props;

  return (
    <Root
      defaultOpen={defaultOpen}
      modal={modal}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger asChild>{trigger}</Trigger>

      <Portal
        container={container}
        forceMount={forceMountPortal}
      >
        <PopoverContent
          {...rest}
          className={className || classNames?.content}
          ref={ref}
          size={size}
        >
          {children}

          {closeIcon && <Close asChild>{closeIcon}</Close>}

          {showArrow && (
            <PopoverArrow
              className={classNames?.arrow}
              height={arrowHeight}
              size={size}
              width={arrowWidth}
            />
          )}
        </PopoverContent>
      </Portal>
    </Root>
  );
});

PopoverUI.displayName = 'PopoverUI';

export default PopoverUI;
