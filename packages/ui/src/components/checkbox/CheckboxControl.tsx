import { Root } from '@radix-ui/react-checkbox';
import { checkboxVariants, cn } from '@soybean-react-ui/variants';
import React from 'react';

import type { CheckboxControlProps } from './types';

const CheckboxControl = React.forwardRef<React.ComponentRef<typeof Root>, CheckboxControlProps>((props, ref) => {
  const { className, color, size, ...rest } = props;

  const { control } = checkboxVariants({ color, size });

  const mergedCls = cn(control(), className);

  return (
    <Root
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

CheckboxControl.displayName = 'CheckboxControl';

export default CheckboxControl;
