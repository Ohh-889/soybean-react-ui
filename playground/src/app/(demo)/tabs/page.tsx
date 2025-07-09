'use client';

import React, { useState } from 'react';
import type { TabsOptionData } from 'soybean-react-ui';
import { Card, Tabs } from 'soybean-react-ui';

const tabs = [
  {
    children: ({ item: { value } }) => <div>The Tab Content: {value}</div>,
    label: 'Tab 1',
    value: '1'
  },
  {
    children: ({ item: { value } }) => <div>The Tab Content: {value}</div>,
    label: 'Tab 2',
    value: '2'
  },
  {
    children: ({ item: { value } }) => <div>The Tab Content: {value}</div>,
    label: 'Tab 3',
    value: '3'
  }
] satisfies TabsOptionData[];

function TabsPage() {
  const [value, setValue] = useState('1');

  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Horizontal"
      >
        <div className="w-[320px] lt-sm:w-full">
          <Tabs
            classNames={{ content: 'p-4 border border-border rounded-1' }}
            defaultValue="1"
            items={tabs}
            value={value}
            onValueChange={setValue}
          />
        </div>
      </Card>
    </div>
  );
}

TabsPage.displayName = 'TabsPage';

export default TabsPage;
