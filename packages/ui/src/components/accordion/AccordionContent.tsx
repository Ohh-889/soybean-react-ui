import { Content } from '@radix-ui/react-accordion';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { accordionVariants } from './accordion-variants';
import type { AccordionContentProps } from './types';

const AccordionContent = forwardRef<ComponentRef<typeof Content>, AccordionContentProps>((props, ref) => {
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
