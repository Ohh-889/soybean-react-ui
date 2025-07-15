import { checkboxVariants, cn } from '@soybean-react-ui/variants';
import React from 'react';

import type { CheckboxRootProps } from './types';

const CheckboxRoot = React.forwardRef<HTMLDivElement, CheckboxRootProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { root } = checkboxVariants({ size });

  const mergedCls = cn(root(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

CheckboxRoot.displayName = 'CheckboxRoot';

export default CheckboxRoot;
