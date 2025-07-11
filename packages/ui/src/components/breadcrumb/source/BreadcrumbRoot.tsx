import { breadcrumbVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { BreadcrumbRootProps } from '../types';

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { root } = breadcrumbVariants({ size });

  const mergedCls = cn(root(), className);

  return (
    <nav
      aria-label="breadcrumb"
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

BreadcrumbRoot.displayName = 'BreadcrumbRoot';

export default BreadcrumbRoot;
