import React from 'react';

import DividerLabel from './DividerLabel';
import DividerRoot from './DividerRoot';
import type { DividerProps } from './types';

const Divider = React.forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const { align, children, className, classNames, leading, orientation, size, trailing, ...rest } = props;

  return (
    <DividerRoot
      className={className || classNames?.root}
      orientation={orientation}
      {...rest}
      ref={ref}
    >
      {leading}

      {Boolean(children) && (
        <DividerLabel
          align={align}
          className={classNames?.label}
          orientation={orientation}
          size={size}
          {...rest}
        >
          {children}
        </DividerLabel>
      )}

      {trailing}
    </DividerRoot>
  );
});

Divider.displayName = 'Divider';

export default Divider;
