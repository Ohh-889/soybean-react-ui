'use client';

import { usePathname } from 'next/navigation';
import type { TabsOptionData } from 'skyroc-ui';
import { Tabs } from 'skyroc-ui';

type DemoTabsProps = {
  items: TabsOptionData[];
};

export default function DemoTabs({ items }: DemoTabsProps) {
  const pathname = usePathname();

  const currentTab = pathname.split('/').pop();

  return (
    <Tabs
      enableIndicator={false}
      items={items}
      value={currentTab}
      classNames={{
        list: 'flex-wrap justify-start'
      }}
    />
  );
}
