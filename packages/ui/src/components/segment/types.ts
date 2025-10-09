import type { TabsOptionData, TabsProps } from '../tabs/types';

export type SegmentOptionData = Omit<TabsOptionData, 'children'>;

export type SegmentProps<T extends SegmentOptionData> = Omit<TabsProps<TabsOptionData>, 'items'> & {
  items: T[];
};
