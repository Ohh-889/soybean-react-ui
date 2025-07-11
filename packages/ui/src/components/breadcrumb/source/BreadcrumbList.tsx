import { breadcrumbVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { BreadcrumbListProps } from '../types';

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { list } = breadcrumbVariants({ size });

  const mergedCls = cn(list(), className);

  return (
    <ol
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

BreadcrumbList.displayName = 'BreadcrumbList';

export default BreadcrumbList;
