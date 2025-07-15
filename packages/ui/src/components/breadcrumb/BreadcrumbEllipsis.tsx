import { breadcrumbVariants, cn } from '@soybean-react-ui/variants';
import { Ellipsis } from 'lucide-react';

import type { BreadcrumbEllipsisProps } from './types';

const BreadcrumbEllipsis = (props: BreadcrumbEllipsisProps) => {
  const { children, className, ...rest } = props;

  const { ellipsis } = breadcrumbVariants();

  const mergedCls = cn(ellipsis, className);
  return (
    <span
      aria-hidden="true"
      className={mergedCls}
      role="presentation"
      {...rest}
    >
      {children || <Ellipsis />}
      <span className="sr-only">More</span>
    </span>
  );
};

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export default BreadcrumbEllipsis;
