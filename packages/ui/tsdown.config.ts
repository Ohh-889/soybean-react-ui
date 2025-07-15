import fg from 'fast-glob';
import { defineConfig } from 'tsdown';

import pkg from './package.json';

export default defineConfig({
  alias: {
    '@': './src'
  },
  clean: true,
  dts: true,
  entry: [
    ...fg.sync('src/components/**/index.ts'),
    ...fg.sync('src/*/index.ts').filter(glob => glob !== 'src/types/index.ts'),
    'src/index.ts'
  ],
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)],
  hooks: {
    'build:before': () => {
      console.log('📦 Building JavaScript files with Tsdown...');
    },
    'build:done': () => {
      console.log('🎉 Build completed successfully!');
      console.log('📦 Generated files in ./dist/');
    },
    'build:prepare': () => {
      console.log('📦 Building JavaScript files with Tsdown...');
    }
  },
  minify: false,
  platform: 'neutral',
  sourcemap: false,
  unbundle: true
});
