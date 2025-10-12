import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { defineConfig } from '@skyroc/cli';

let tag = '';

export default defineConfig({
  changelogOptions: {
    to: tag
  },
  // Custom git commit scopes
  // If not set, will use default scopes from locale
  gitCommitScopes: [
    ['@skyroc/form', 'Advanced form handling library with type-safe field management for React applications'],
    ['skyroc-ui-playground', 'Playground for skyroc-ui'],
    ['@skyroc/utils', 'Utility functions and helpers for TypeScript/JavaScript applications'],
    [
      '@skyroc/type-utils',
      'Advanced TypeScript utility types for form handling, path manipulation, and type transformations'
    ],
    ['@skyroc/color', 'Color utilities for TypeScript/JavaScript applications'],
    ['@skyroc/next-docs-plugin', 'Next.js docs plugin for skyroc-ui'],
    ['@skyroc/tailwind-plugin', 'Tailwind plugin for skyroc-ui'],
    ['skyroc-ui', 'another ui library like shadcn for React.'],
    ['create-skyroc', 'create skyroc-ui project'],
    ['@skyroc/cli', 'CLI for skyroc-ui'],
    ['skyroc-ui-docs', 'Docs for skyroc-ui'],
    ['other', 'other changes']
  ],
  releaseOptions: options => {
    const { packageName: pathName, preid, release } = options;

    // Validate package name is provided
    if (!pathName) {
      // eslint-disable-next-line no-console
      console.error('❌ Package name is required, e.g.: pnpm release skyroc-form');
      process.exit(1);
    }
    const cwd = path.resolve(pathName);
    const pkgPath = path.join(cwd, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      // eslint-disable-next-line no-console
      console.error(`❌ Package not found: ${pkgPath}`);
      process.exit(1);
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    const current = pkg.version;

    const pkgName = pkg.name;

    console.log(`🔍 Current version: ${pkgName}@${current}`);

    return {
      commit: `chore(${pkgName}): release v%s`,
      confirm: false,
      cwd,
      execute: op => {
        console.log('New version:', op.state.newVersion);

        tag = `${pkgName}@${op.state.newVersion}`;
        execSync(`npx sr changelog`);
      },
      files: ['package.json'],
      preid,
      progress(info) {
        // Log release progress events

        console.log(`[${info.event}] ${info.newVersion ?? ''} ${info.commit ?? ''}`);
      },
      // Automatic commit type analysis
      push: false,
      release,
      tag: `${pkgName}@%s`
    };
  }
});
