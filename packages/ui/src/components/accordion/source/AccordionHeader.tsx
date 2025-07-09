import { Header } from '@radix-ui/react-accordion';
import { accordionVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AccordionHeaderProps } from '../types';

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
