import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import Link from 'next/link';
import React from 'react';
import { Card, ScrollArea } from 'soybean-react-ui';

import DemoTabs from './modules/DemoTabs';
import DemoTitle from './modules/DemoTitle';

// 动态读取组件目录的函数
function getComponentDirectories() {
  try {
    // 获取组件目录的绝对路径
    const componentsPath = path.join(process.cwd(), '../packages/ui/src/components');

    // 读取目录内容
    const entries = fs.readdirSync(componentsPath, { withFileTypes: true });

    // 过滤出目录并生成tabs数据
    const componentDirs = entries
      .filter(entry => entry.isDirectory())
      .map(dir => ({
        children: null,
        label: <Link href={`/${dir.name}`}>{dir.name.charAt(0).toUpperCase() + dir.name.slice(1)}</Link>,
        // 首字母大写
        value: dir.name
      }));

    return componentDirs;
  } catch (error) {
    console.error('读取组件目录失败:', error);
    // 如果读取失败，返回默认值
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
