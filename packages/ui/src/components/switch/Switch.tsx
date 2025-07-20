import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import SwitchRoot from './SwitchRoot';
import SwitchThumb from './SwitchThumb';
import type { SwitchProps } from './types';

const Switch = forwardRef<ComponentRef<typeof SwitchRoot>, SwitchProps>((props, ref) => {
  const { children, className, classNames, size, ...rest } = props;

  return (
    <SwitchRoot
      className={className || classNames?.root}
      ref={ref}
      size={size}
      {...rest}
    >
      <SwitchThumb
        className={classNames?.thumb}
        size={size}
      >
        {children}
      </SwitchThumb>
    </SwitchRoot>
  );
});

Switch.displayName = 'Switch';

export default Switch;
