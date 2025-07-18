import type {
  AccordionContentProps as _AccordionContentProps,
  AccordionHeaderProps as _AccordionHeaderProps,
  AccordionItemProps as _AccordionItemProps,
  // eslint-disable-next-line sort-imports
  AccordionMultipleProps,
  AccordionSingleProps,
  AccordionTriggerProps as _AccordionTriggerProps
} from '@radix-ui/react-accordion';

import type { BaseNodeProps, ClassValue, PropsSlot, ThemeSize } from '@/types/other';

import type { AccordionSlots } from './accordion-variants';

/** The ui of the accordion. */
export type AccordionClassNames = Partial<Record<AccordionSlots, ClassValue>>;

export type AccordionRootProps = BaseNodeProps<AccordionSingleProps> | BaseNodeProps<AccordionMultipleProps>;

export interface AccordionHeaderProps extends BaseNodeProps<_AccordionHeaderProps> {}

export interface AccordionContentProps extends BaseNodeProps<_AccordionContentProps> {}

export interface AccordionItemProps extends BaseNodeProps<_AccordionItemProps> {}

export interface AccordionTriggerProps extends BaseNodeProps<_AccordionTriggerProps>, PropsSlot {
  /** The ui of the accordion trigger. */
  classNames?: Pick<AccordionClassNames, 'triggerIcon' | 'triggerLeadingIcon'>;
  icon?: React.ReactNode;
}

// Accordion
export interface AccordionItemData extends Pick<AccordionItemProps, 'disabled' | 'value'> {
  children: React.ReactNode;
  leading?: React.ReactNode;
  title: React.ReactNode;
  trailing?: React.ReactNode;
}

export type AccordionProps<T extends AccordionItemData = AccordionItemData> = AccordionRootProps & {
  classNames?: AccordionClassNames;
  items: T[];
  size?: ThemeSize;
  triggerIcon?: React.ReactNode;
  triggerLeading?: React.ReactNode;
  triggerTrailing?: React.ReactNode;
};
