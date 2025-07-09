import type {
  AccordionContentProps as _AccordionContentProps,
  AccordionHeaderProps as _AccordionHeaderProps,
  AccordionItemProps as _AccordionItemProps,
  // eslint-disable-next-line sort-imports
  AccordionMultipleProps,
  AccordionSingleProps,
  AccordionTriggerProps as _AccordionTriggerProps
} from '@radix-ui/react-accordion';
import type { AccordionSlots, ClassValue, ThemeSize } from '@soybean-react-ui/variants';

import type { BaseNodeProps, PropsSlot } from '../../types/other';

/** The ui of the accordion. */
export type AccordionUi = Partial<Record<AccordionSlots, ClassValue>>;

export type AccordionRootProps = BaseNodeProps<AccordionSingleProps> | BaseNodeProps<AccordionMultipleProps>;

export type AccordionHeaderProps = BaseNodeProps<_AccordionHeaderProps>;

export type AccordionContentProps = BaseNodeProps<_AccordionContentProps>;

export type AccordionItemProps = BaseNodeProps<_AccordionItemProps>;

export interface AccordionTriggerProps extends BaseNodeProps<_AccordionTriggerProps>, PropsSlot {
  /** The ui of the accordion trigger. */
  classNames?: Pick<AccordionUi, 'triggerIcon' | 'triggerLeadingIcon'>;
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
  classNames?: AccordionUi;
  items: T[];
  size?: ThemeSize;
  triggerIcon?: React.ReactNode;
  triggerLeading?: React.ReactNode;
  triggerTrailing?: React.ReactNode;
};
