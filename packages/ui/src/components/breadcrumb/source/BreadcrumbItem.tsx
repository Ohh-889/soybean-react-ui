import { breadcrumbVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { BreadcrumbItemProps } from '../types';

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
