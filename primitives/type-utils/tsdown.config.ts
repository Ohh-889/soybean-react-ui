import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: {
    resolve: true
  },
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: false,
  platform: 'neutral',
  shims: true,
  sourcemap: false
});
