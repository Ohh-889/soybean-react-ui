import type {
  TabsContentProps as _TabsContentProps,
  TabsListProps as _TabsListProps,
  TabsProps as _TabsRootProps,
  TabsTriggerProps as _TabsTriggerProps
} from '@radix-ui/react-tabs';

import type { BaseProps, ClassValue, ThemeOrientation } from '@/types/other';

import type { TabsFill, TabsSlots } from './tabs-variants';

export interface IndicatorStyle {
  position: number | null;
  size: number | null;
}

export type TabsUi = Partial<Record<TabsSlots, ClassValue>>;

export interface TabsRootProps extends BaseProps<Omit<_TabsRootProps, 'className'>> {
  fill?: TabsFill;
}

export interface TabsListProps extends BaseProps<Omit<_TabsListProps, 'className'>>, Pick<_TabsRootProps, 'value'> {
  classNames?: Pick<TabsUi, 'indicator' | 'indicatorRoot'>;
  enableIndicator?: boolean;
  orientation?: ThemeOrientation;
}

export interface TabsTriggerProps extends BaseProps<Omit<_TabsTriggerProps, 'className'>> {
  enableIndicator?: boolean;
}

export interface TabsContentProps extends BaseProps<Omit<_TabsContentProps, 'className'>> {
  orientation?: ThemeOrientation;
}

export type TabsOptionData = Pick<TabsTriggerProps, 'disabled'> & {
  children: React.ReactNode | ((props: { active: boolean; item: TabsOptionData }) => React.ReactNode);
  label: React.ReactNode;
  value: string;
};

export type TabsProps<T extends TabsOptionData> = TabsRootProps &
  TabsListProps & {
    classNames?: TabsUi;
    enableIndicator?: boolean;
    forceMountContent?: true;
    items: T[];
  };
