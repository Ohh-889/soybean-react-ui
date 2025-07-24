import { Root, Trigger } from '@radix-ui/react-hover-card';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import HoverCardArrow from './HoverCardArrow';
import HoverCardContent from './HoverCardContent';
import type { HoverCardProps } from './types';

const HoverCard = forwardRef<ComponentRef<typeof HoverCardContent>, HoverCardProps>((props, ref) => {
  const { arrowProps, children, className, classNames, showArrow, trigger, ...rest } = props;

  return (
    <Root
      data-slot="hover-card-root"
      {...rest}
    >
      <Trigger
        asChild
        data-slot="hover-card-trigger"
      >
        {trigger}
      </Trigger>

      <HoverCardContent
        className={className || classNames?.content}
        ref={ref}
      >
        {children}

        {showArrow && (
          <HoverCardArrow
            {...arrowProps}
            className={classNames?.arrow}
          />
        )}
      </HoverCardContent>
    </Root>
  );
});

HoverCard.displayName = 'HoverCard';

export default HoverCard;
