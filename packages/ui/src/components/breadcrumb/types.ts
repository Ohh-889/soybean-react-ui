import type { BreadcrumbSlots } from '@soybean-react-ui/variants';

import type { BaseComponentProps, ClassValue, PropsSlot } from '../../types/other';

export type BreadcrumbEllipsisProps = BaseComponentProps<'span'>;

export type BreadcrumbItemProps = BaseComponentProps<'li'>;

export type BreadcrumbLinkProps = BaseComponentProps<'a'> & {
  asChild?: boolean;
};

export type BreadcrumbListProps = BaseComponentProps<'ol'>;

export type BreadcrumbPageProps = BaseComponentProps<'span'>;

export type BreadcrumbRootProps = BaseComponentProps<'nav'>;

export type BreadcrumbSeparatorProps = BaseComponentProps<'li'>;

export interface BreadcrumbItem extends BreadcrumbLinkProps, PropsSlot {
  className?: ClassValue;
  label: React.ReactNode;
  value: string;
}

export type BreadcrumbUi = Partial<Record<BreadcrumbSlots, ClassValue>>;

export type BreadcrumbProps<T extends BreadcrumbItem> = BreadcrumbRootProps & {
  classNames?: Omit<BreadcrumbUi, 'link' | 'page'>;
  /**
   * the range of items to show ellipsis
   *
   * when the item count is greater than 4, we will show ellipsis
   *
   * start: the start index of the ellipsis
   *
   * end: the end index of the ellipsis.
   */
  ellipsis?: true | [number, number] | null;
  ellipsisIcon?: React.ReactNode;
  handleItemClick?: (item: T) => void;
  items: T[];
  renderEllipsis?: (items: T[]) => React.ReactNode;
  renderItem?: (item: T) => React.ReactNode;
  separator?: React.ReactNode;
};
