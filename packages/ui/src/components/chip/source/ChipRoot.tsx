import { chipVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { ChipRootProps } from '../types';

const ChipRoot = forwardRef<HTMLDivElement, ChipRootProps>((props, ref) => {
  const { className, ...rest } = props;

  const { root } = chipVariants();

  const mergedCls = cn(root(), className);

  return (
    <div
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

ChipRoot.displayName = 'ChipRoot';

export default ChipRoot;
