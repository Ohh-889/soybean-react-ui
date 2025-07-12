import { Indicator } from '@radix-ui/react-checkbox';
import { checkboxVariants, cn } from '@soybean-react-ui/variants';
import React from 'react';

import type { CheckboxIndicatorProps } from '../types';

const CheckboxIndicator = React.forwardRef<React.ComponentRef<typeof Indicator>, CheckboxIndicatorProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    const { indicator } = checkboxVariants();

    const mergedCls = cn(indicator(), className);

    return (
      <Indicator
        className={mergedCls}
        {...rest}
        ref={ref}
      />
    );
  }
);

CheckboxIndicator.displayName = 'CheckboxIndicator';

export default CheckboxIndicator;
