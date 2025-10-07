import path from 'node:path';

import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['picsum.photos'],
    unoptimized: true
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      'soybean-react-ui': path.resolve('../packages/ui/src/index.js')
    },
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx']
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      'rehype-slug',
      ['rehype-autolink-headings', { behavior: 'wrap' }],
      ['rehype-pretty-code', { theme: { dark: 'github-dark', light: 'github-light' } }],
      'skyroc-next-docs-plugin'
    ],
    remarkPlugins: ['remark-gfm']
  }
});

export default withMDX(nextConfig);
