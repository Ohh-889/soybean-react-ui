import { forwardRef } from 'react';

import ChipContent from './ChipContent';
import ChipRoot from './ChipRoot';
import type { ChipProps } from './types';

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const { children, className, classNames, color, content, open = true, position, size, ...rest } = props;

  return (
    <ChipRoot
      className={className || classNames?.root}
      ref={ref}
      {...rest}
    >
      {children}

      {open && (
        <ChipContent
          className={classNames?.content}
          color={color}
          position={position}
          size={size}
        >
          {content}
        </ChipContent>
      )}
    </ChipRoot>
  );
});

Chip.displayName = 'Chip';

export default Chip;
