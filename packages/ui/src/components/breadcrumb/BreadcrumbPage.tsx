import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { breadcrumbVariants } from './breadcrumb-variants';
import type { BreadcrumbPageProps } from './types';

const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { page } = breadcrumbVariants({ size });

  const mergedCls = cn(page(), className);

  return (
    <span
      aria-current="page"
      aria-disabled="true"
      className={mergedCls}
      ref={ref}
      role="link"
      {...rest}
    />
  );
});

BreadcrumbPage.displayName = 'BreadcrumbPage';

export default BreadcrumbPage;
