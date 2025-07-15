import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { chipVariants } from './chip-variants';
import type { ChipRootProps } from './types';

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
