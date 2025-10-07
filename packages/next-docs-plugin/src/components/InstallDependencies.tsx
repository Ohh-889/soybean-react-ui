'use client';

import { useState } from 'react';

import { Tabs } from '@/components/tabs';

import CopyButton from './CopyButton';

type InstallDependenciesProps = {
  pkg: string;
};

const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;

const InstallDependencies = (props: InstallDependenciesProps) => {
  const { pkg } = props;

  const [activePackageManager, setActivePackageManager] = useState<string>(PACKAGE_MANAGERS[0]);

  const items = PACKAGE_MANAGERS.map(manager => ({
    children: () => (
      <div className="h-10 flex-y-center justify-between gap-2 border rounded-md pl-3 pr-1.5">
        <code className="text-sm">
          $ {manager} add {pkg}
        </code>
        <CopyButton content={`${manager} add ${props.pkg}`} />
      </div>
    ),
    label: manager,
    value: manager
  }));

  return (
    <Tabs
      className="w-fit"
      defaultValue="npm"
      items={items}
      value={activePackageManager}
      onValueChange={setActivePackageManager}
    />
  );
};

export default InstallDependencies;
