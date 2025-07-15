import { Header } from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { accordionVariants } from './accordion-variants';
import type { AccordionHeaderProps } from './types';

const AccordionHeader = forwardRef<React.ElementRef<typeof Header>, AccordionHeaderProps>((props, ref) => {
  const { className, ...rest } = props;

  const { header } = accordionVariants();

  const mergedCls = cn(header(), className);

  return (
    <Header
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});
AccordionHeader.displayName = Header.displayName;

export default AccordionHeader;
