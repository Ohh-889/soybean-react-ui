import { exec } from 'node:child_process';
import fs from 'node:fs/promises';

import { rimraf } from 'rimraf';

import { getSelfRegistryDependencies } from './constants';
import { registerType } from './registry-type';
import { getRegistryUi } from './registry-ui';
import { registryUtils } from './registry-utils';
import { getPath, lintFile } from './shared';

// eslint-disable-next-line n/prefer-global/process
const registryPath = getPath(`registry.json`);

// eslint-disable-next-line n/prefer-global/process
const targetPath = getPath(`../../playground/public/r`);

const registry = {
  homepage: 'https://ui-play.skyroc.me/',
  items: [
    {
      css: {
        '@import "tailwindcss"': {},
        '@import "tw-animate-css"': {},
        '@plugin "../plugins/tailwind-plugin"': {},
        '@plugin "tailwindcss-animate"': {},
        html: {
          'overflow-x': 'hidden'
        },
        'html,body,#app': {
          height: '100%'
        }
      },
      dependencies: [
        'tailwind-variants',
        'tailwindcss-animate',
        '@skyroc/color',
        'tw-animate-css',
        'tailwindcss',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        '@tailwindcss/postcss'
      ],
      extends: 'none',
      files: [
        {
          path: '../tailwind-plugin/src/generate.ts',
          target: 'plugins/tailwind-plugin/generate.ts',
          type: 'registry:file'
        },
        {
          path: '../tailwind-plugin/src/types.ts',
          target: 'plugins/tailwind-plugin/types.ts',
          type: 'registry:file'
        },
        {
          path: '../tailwind-plugin/src/themePresets.ts',
          target: 'plugins/tailwind-plugin/themePresets.ts',
          type: 'registry:file'
        },
        {
          path: '../tailwind-plugin/src/index.ts',
          target: 'plugins/tailwind-plugin/index.ts',
          type: 'registry:file'
        },
        {
          path: '../tailwind-plugin/src/presets.ts',
          target: 'plugins/tailwind-plugin/presets.ts',
          type: 'registry:file'
        },
        {
          path: '../tailwind-plugin/src/theme.json',
          target: 'plugins/tailwind-plugin/theme.json',
          type: 'registry:file'
        }
      ],
      name: 'style',
      registryDependencies: [getSelfRegistryDependencies('utils'), getSelfRegistryDependencies('types')],
      type: 'registry:style'
    },
    ...getRegistryUi(),
    registerType,
    registryUtils
  ],
  name: 'soybean-react-ui'
};

const registryJson = JSON.stringify(registry, null, 2);

async function writeRegistry() {
  await fs.writeFile(registryPath, registryJson);

  console.log('🧹 Deleting:', targetPath);

  rimraf.sync(targetPath);
}

async function buildRegistry() {
  return new Promise((resolve, reject) => {
    const process = exec(`pnpm build:registry`);

    process.on('exit', code => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

async function main() {
  try {
    console.log('🔨 Starting registry build...');
    await writeRegistry();

    lintFile(registryPath);

    await buildRegistry();

    console.log('✅ writing registry to :', registryPath);

    await fs.writeFile(`${targetPath}/registry.json`, registryJson);

    lintFile(targetPath);

    console.log('✅ Registry build completed');
  } catch (error) {
    console.error('❌ Build failed with error:');
    console.error(error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    // eslint-disable-next-line n/prefer-global/process
    process.exit(1);
  }
}

main();
