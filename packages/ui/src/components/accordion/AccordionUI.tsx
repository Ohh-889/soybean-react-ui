import type { Root } from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import AccordionContent from './AccordionContent';
import AccordionHeader from './AccordionHeader';
import AccordionItem from './AccordionItem';
import AccordionRoot from './AccordionRoot';
import AccordionTrigger from './AccordionTrigger';
import type { AccordionProps } from './types';

const AccordionUI = forwardRef<React.ElementRef<typeof Root>, AccordionProps>((props, ref) => {
  const { className, classNames, dir, items, size, triggerIcon, triggerLeading, triggerTrailing, ...rest } = props;

  return (
    <AccordionRoot
      className={className || classNames?.root}
      ref={ref}
      {...rest}
    >
      {items.map(item => (
        <AccordionItem
          className={classNames?.item}
          dir={dir}
          disabled={item.disabled}
          key={item.value}
          value={item.value}
        >
          <AccordionHeader
            className={classNames?.header}
            dir={dir}
          >
            <AccordionTrigger
              className={classNames?.trigger}
              classNames={classNames}
              dir={dir}
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
            dir={dir}
            size={size}
          >
            {item.children}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
});
AccordionUI.displayName = 'AccordionUI';

export default AccordionUI;
