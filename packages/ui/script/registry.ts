import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

import { rimraf } from 'rimraf';

import { registerType } from './registry-type';
import { getRegistryUi } from './registry-ui';
import { registryUtils } from './registry-utils';

const registry = {
  homepage: 'https://ui-playground.ohh-889.com/',
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
  // eslint-disable-next-line n/prefer-global/process
  await fs.writeFile(path.join(process.cwd(), `registry.json`), registryJson);

  // eslint-disable-next-line n/prefer-global/process
  const targetPath = path.join(process.cwd(), `../../playground/public/r`);
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

    await buildRegistry();
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
