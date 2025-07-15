import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: false,
  outExtension: ctx => {
    return {
      js: ctx.format === 'cjs' ? '.cjs' : '.mjs'
    };
  },
  shims: true,
  sourcemap: false,
  target: 'node14'
});
