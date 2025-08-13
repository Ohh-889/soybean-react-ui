import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  minify: false,
  outExtensions: ctx => {
    return {
      js: ctx.format === 'cjs' ? '.cjs' : '.mjs'
    };
  },
  platform: 'neutral',
  shims: true,
  sourcemap: false
});
