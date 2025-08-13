import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  minify: false,
  platform: 'node',
  sourcemap: false
});
