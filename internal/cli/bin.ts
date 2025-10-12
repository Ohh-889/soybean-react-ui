#!/usr/bin/env tsx
import { setupCli } from './src/index.ts';

setupCli().catch(err => {
  console.log('setupCli error');
  console.error(err);
  process.exit(1);
});
