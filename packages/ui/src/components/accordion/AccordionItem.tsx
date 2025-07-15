import { Item } from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { accordionVariants } from './accordion-variants';
import type { AccordionItemProps } from './types';

const AccordionItem = forwardRef<React.ElementRef<typeof Item>, AccordionItemProps>((props, ref) => {
  const { className, ...rest } = props;

  const { item } = accordionVariants();

  const mergedCls = cn(item(), className);

  return (
    <Item
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});
AccordionItem.displayName = Item.displayName;

export default AccordionItem;
