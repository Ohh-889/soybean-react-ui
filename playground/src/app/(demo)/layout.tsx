import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Link from 'next/link';
import React from 'react';
import { Card } from 'soybean-react-ui';

import DemoTabs from './modules/DemoTabs';
import DemoTitle from './modules/DemoTitle';

function getComponentDirectories() {
  try {
    const componentsPath = path.join(fileURLToPath(import.meta.url), '..');

    const entries = fs.readdirSync(componentsPath, { withFileTypes: true });

    const componentDirs = entries
      .filter(entry => entry.isDirectory() && entry.name !== 'modules')
      .map(dir => ({
        children: null,
        label: <Link href={`/${dir.name}`}>{dir.name.charAt(0).toUpperCase() + dir.name.slice(1)}</Link>,
        value: dir.name
      }));

    return componentDirs;
  } catch (error) {
    console.error('failed to read the component directory:', error);

    return [{ children: null, label: 'Button', value: 'button' }];
  }
}

function DemoLayout({ children }: { children: React.ReactNode }) {
  const componentTabs = getComponentDirectories();

  return (
    <>
      <DemoTabs items={componentTabs} />

      <Card
        className="h-full"
        classNames={{ content: 'flex-c gap-3 ' }}
        title={<DemoTitle />}
      >
        {children}
      </Card>
    </>
  );
}

export default DemoLayout;
