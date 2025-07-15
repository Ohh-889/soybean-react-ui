'use client';

import type { Root } from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import AccordionContent from './AccordionContent';
import AccordionHeader from './AccordionHeader';
import AccordionItem from './AccordionItem';
import AccordionRoot from './AccordionRoot';
import AccordionTrigger from './AccordionTrigger';
import { accordionVariants } from './accordion-variants';
import type { AccordionProps } from './types';

const Accordion = forwardRef<React.ElementRef<typeof Root>, AccordionProps>((props, ref) => {
  const { className, classNames, items, size, triggerIcon, triggerLeading, triggerTrailing, ...rest } = props;

  const { root } = accordionVariants({ size });

  const mergedCls = cn(root(), className);

  return (
    <AccordionRoot
      className={mergedCls}
      ref={ref}
      {...rest}
    >
      {items.map(item => (
        <AccordionItem
          className={classNames?.item}
          disabled={item.disabled}
          key={item.value}
          value={item.value}
        >
          <AccordionHeader className={classNames?.header}>
            <AccordionTrigger
              className={classNames?.trigger}
              classNames={classNames}
              icon={triggerIcon}
              leading={item.leading || triggerLeading}
              size={size}
              trailing={item.trailing || triggerTrailing}
            >
              {item.title}
            </AccordionTrigger>
          </AccordionHeader>

          <AccordionContent
            className={classNames?.content}
            size={size}
          >
            {item.children}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
});
Accordion.displayName = 'Accordion';

export default Accordion;
