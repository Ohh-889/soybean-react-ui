'use client';

import type { Root } from '@radix-ui/react-accordion';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { useComponentConfig } from '../config-provider/context';

import AccordionUI from './AccordionUI';
import type { AccordionProps } from './types';

const Accordion = forwardRef<ComponentRef<typeof Root>, AccordionProps>((props, ref) => {
  const config = useComponentConfig('accordion');

  const mergedProps = {
    ...config,
    ...props
  };

  return (
    <AccordionUI
      {...mergedProps}
      ref={ref}
    />
  );
});

Accordion.displayName = 'Accordion';

export default Accordion;
