import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { defineConfig } from '@skyroc/cli';

function getLastTag() {
  const tag = execSync('git tag -l ').toString().split('\n');

  return tag.at(-2);
}

export default defineConfig({
  changelogOptions: {
    from: getLastTag()
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

    console.log('pkgPath', pkgPath);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    const current = pkg.version;

    const pkgName = pkg.name;

    // eslint-disable-next-line no-console
    console.log(`🔍 Current version: ${pkgName}@${current}`);

    return {
      commit: `chore(${pkgName}): release v%s`,
      confirm: false,
      // Use function to access op.state.newVersion and pass it to changelog command
      execute: async op => {
        const { execSync: execSync2 } = await import('node:child_process');
        const tag = `${pkgName}@${op.state.newVersion}`;

        console.log(`📝 Generating changelog for tag: ${tag}`);

        // Execute changelog command in the root directory with the tag parameter
        execSync2(`pnpm sr changelog --tag v-${tag}`, {
          cwd: process.cwd(),
          env: { ...process.env, CHANGELOG_TAG: tag },
          stdio: 'inherit'
        });

        // Add CHANGELOG.md to git staging area
      },
      files: [pkgPath, './CHANGELOG.md'],
      preid,
      progress(info) {
        // eslint-disable-next-line no-console
        console.log(`[${info.event}] ${info.newVersion ?? ''} ${info.commit ?? ''}`);
      },
      // Automatic commit type analysis
      push: true,
      release,
      tag: `v-${pkgName}@%s`
    };
  }
});
