import { cn } from '@/lib/utils';

import { skeletonVariants } from './skeleton-variants';
import type { SkeletonProps } from './types';

function Skeleton(props: SkeletonProps) {
  const { className, ...rest } = props;

  const mergedCls = cn(skeletonVariants(), className);

  return (
    <div
      className={mergedCls}
      data-slot="skeleton"
      {...rest}
    />
  );
}

export default Skeleton;
