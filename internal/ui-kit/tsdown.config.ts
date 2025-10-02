import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  minify: false,
  platform: 'neutral',
  shims: true,
  sourcemap: false
});
