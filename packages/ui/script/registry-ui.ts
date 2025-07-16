import path from 'node:path';

import fg from 'fast-glob';
import { type Registry } from 'shadcn/registry';

import { registryComponentsDependencies } from './constants';

const COMPONENTS_DIR = 'src/components';

function formatComponentName(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getGroupedComponents(): Record<string, string[]> {
  const components = fg.sync(`${COMPONENTS_DIR}/**/*`);
  const grouped: Record<string, string[]> = {};

  for (const fullPath of components) {
    const segments = fullPath.split(path.sep);
    const group = segments[2]; // 如 'accordion'
    const name = segments[3]; // 文件名

    // eslint-disable-next-line no-continue
    if (!group || !name) continue;

    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(name);
  }

  return grouped;
}

function generateRegistryItems(grouped: Record<string, string[]>): Registry['items'] {
  const ui = Object.entries(grouped).map(([group, files]) => {
    const item = {
      files: files.map(file => ({
        path: `${COMPONENTS_DIR}/${group}/${file}`,
        target: `components/${group}/${file}`,
        type: 'registry:ui'
      })),
      name: group,
      title: formatComponentName(group),
      type: 'registry:block'
    };

    if (registryComponentsDependencies[group]) {
      Object.assign(item, registryComponentsDependencies[group]);
    }

    return item;
  }) as Registry['items'];

  console.log('🎨 UI component conversion completed.');

  return ui;
}

export function getRegistryUi(): Registry['items'] {
  console.log('📦 Starting to collect components for registry...');
  const grouped = getGroupedComponents();

  console.log('✅ Component collection completed.');

  return generateRegistryItems(grouped);
}
