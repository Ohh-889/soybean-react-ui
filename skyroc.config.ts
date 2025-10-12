import { defineConfig } from '@skyroc/cli';

export default defineConfig({
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
  ]
});
