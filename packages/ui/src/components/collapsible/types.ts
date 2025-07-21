import type {
  CollapsibleContentProps as _CollapsibleContentProps,
  CollapsibleProps as _CollapsibleRootProps
} from '@radix-ui/react-collapsible';

import type { BaseNodeProps, ClassValue } from '@/types/other';

import type { CollapsibleSlots } from './collapsible-variants';

export type CollapsibleRootProps = BaseNodeProps<Omit<_CollapsibleRootProps, 'content'>>;

export type CollapsibleContentProps = BaseNodeProps<_CollapsibleContentProps>;

export type CollapsibleClassNames = Partial<Record<CollapsibleSlots, ClassValue>>;

export interface CollapsibleProps extends CollapsibleRootProps {
  classNames?: CollapsibleClassNames;
  content?: React.ReactNode;
  forceMountContent?: true;
}
