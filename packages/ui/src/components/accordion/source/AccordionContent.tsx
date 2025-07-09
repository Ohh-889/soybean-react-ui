import { Content } from '@radix-ui/react-accordion';
import { accordionVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AccordionContentProps } from '../types';

const AccordionContent = forwardRef<React.ElementRef<typeof Content>, AccordionContentProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { content } = accordionVariants({ size });

  const mergedCls = cn(content(), className);

  return (
    <Content
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});
AccordionContent.displayName = Content.displayName;

export default AccordionContent;
