import type {
  // eslint-disable-next-line sort/import-members
  ToggleGroupMultipleProps,
  ToggleGroupSingleProps,
  ToggleGroupItemProps as _ToggleGroupItemProps
} from '@radix-ui/react-toggle-group';
import type { ReactNode } from 'react';

import type { BaseNodeProps, ClassValue } from '@/types/other';

import type { ToggleProps } from '../toggle';
import type { ToggleSlots } from '../toggle/toggle-variants';

export type ToggleGroupRootProps = BaseNodeProps<ToggleGroupMultipleProps> | BaseNodeProps<ToggleGroupSingleProps>;

export type ToggleGroupItemProps = BaseNodeProps<_ToggleGroupItemProps> & {
  variant?: ToggleProps['variant'];
};

export type ToggleGroupClassNames = Partial<Record<ToggleSlots, ClassValue>>;

export type ToggleGroupItemData = Omit<ToggleGroupItemProps, 'children'> & {
  label: ReactNode;
};

export type ToggleGroupProps<T extends ToggleGroupItemData = ToggleGroupItemData> = ToggleGroupRootProps & {
  classNames?: ToggleGroupClassNames;
  itemRender?: (item: T) => ReactNode;
  items: T[];
  variant?: ToggleProps['variant'];
};
