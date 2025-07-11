import { breadcrumbVariants, cn } from '@soybean-react-ui/variants';
import { ChevronRight } from 'lucide-react';
import { forwardRef } from 'react';

import type { BreadcrumbSeparatorProps } from '../types';

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const { separator } = breadcrumbVariants();

  const mergedCls = cn(separator(), className);

  return (
    <li
      className={mergedCls}
      ref={ref}
      {...rest}
    >
      {children ?? <ChevronRight />}
    </li>
  );
});

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export default BreadcrumbSeparator;
