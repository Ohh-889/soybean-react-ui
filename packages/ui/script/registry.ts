import { exec } from 'node:child_process';
import fs from 'node:fs/promises';

import { rimraf } from 'rimraf';

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
      cssVars: {},
      dependencies: ['tailwind-variants', 'lucide-react'],
      files: [],
      name: 'index',
      registryDependencies: ['utils', 'types'],
      type: 'registry:style'
    },
    ...getRegistryUi(),
    registerType,
    registryUtils
  ],
  name: 'soybean-react-ui'
};

async function writeRegistry() {
  const registryJson = JSON.stringify(registry, null, 2);

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
