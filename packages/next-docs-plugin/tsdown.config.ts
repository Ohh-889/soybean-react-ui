import { defineConfig } from 'tsdown';

export default defineConfig({
  alias: {
    '@': '../ui/src'
  },
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: ['node:path'],
  minify: false,
  platform: 'neutral',
  shims: true,
  sourcemap: false,
  unbundle: true
});
