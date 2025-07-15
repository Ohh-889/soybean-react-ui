import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import Link from 'next/link';
import React from 'react';
import { ScrollArea } from 'soybean-react-ui';

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

      <div className="h-full p-[18px]">
        <div className="h-full mb-8 border border-gray-200 rounded-xl bg-white p-6 shadow-lg transition-all dark:border-neutral-700 dark:bg-neutral-800 hover:shadow-xl">
          <h3 className="border-gray-200 text-xl dark:border-neutral-700 mb-4 border-b pb-2 text-gray-800 font-bold dark:text-gray-100">
            Demo <DemoTitle />
          </h3>

          <ScrollArea className="h-full pb-20">{children}</ScrollArea>
        </div>
      </div>
    </>
  );
}

export default DemoLayout;
