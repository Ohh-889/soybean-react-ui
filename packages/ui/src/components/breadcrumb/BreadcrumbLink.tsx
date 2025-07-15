import { Slot } from '@radix-ui/react-slot';
import { breadcrumbVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { BreadcrumbLinkProps } from './types';

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>((props, ref) => {
  const { asChild, className, ...rest } = props;

  const Comp = asChild ? Slot : 'a';

  const { link } = breadcrumbVariants();

  const mergedCls = cn(link(), className);

  return (
    <Comp
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

BreadcrumbLink.displayName = 'BreadcrumbLink';

export default BreadcrumbLink;
