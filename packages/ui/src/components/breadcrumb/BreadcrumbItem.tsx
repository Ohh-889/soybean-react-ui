import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { breadcrumbVariants } from './breadcrumb-variants';
import type { BreadcrumbItemProps } from './types';

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { item } = breadcrumbVariants({ size });

  const mergedCls = cn(item(), className);

  return (
    <li
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;
