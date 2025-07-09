import { Root } from '@radix-ui/react-accordion';
import { accordionVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AccordionRootProps } from '../types';

const AccordionRoot = forwardRef<React.ElementRef<typeof Root>, AccordionRootProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { root } = accordionVariants({ size });

  const mergedCls = cn(root(), className);

  return (
    <Root
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});
AccordionRoot.displayName = Root.displayName;

export default AccordionRoot;
