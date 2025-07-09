'use client';

import { usePathname } from 'next/navigation';
import type { TabsOptionData } from 'soybean-react-ui';
import { Tabs } from 'soybean-react-ui';

type DemoTabsProps = {
  items: TabsOptionData[];
};

export default function DemoTabs({ items }: DemoTabsProps) {
  const pathname = usePathname();

  const currentTab = pathname.split('/').pop();

  return (
    <Tabs
      items={items}
      value={currentTab}
    />
  );
}
