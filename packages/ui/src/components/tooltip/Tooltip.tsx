import { Root, Trigger } from '@radix-ui/react-tooltip';

import TooltipArrow from './TooltipArrow';
import TooltipContent from './TooltipContent';
import type { TooltipProps } from './types';

const Tooltip = (props: TooltipProps) => {
  const { children, className, classNames, content, contentProps, showArrow, size, ...rest } = props;

  return (
    <Root {...rest}>
      <Trigger asChild>{children}</Trigger>

      <TooltipContent
        className={className || classNames?.content}
        size={size}
        {...contentProps}
      >
        {content}

        {showArrow && (
          <TooltipArrow
            className={classNames?.arrow}
            size={size}
          />
        )}
      </TooltipContent>
    </Root>
  );
};

export default Tooltip;
