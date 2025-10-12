import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: [/^node:/],
  format: ['cjs', 'esm'],
  minify: false,
  platform: 'node',
  shims: true,
  sourcemap: false
});
