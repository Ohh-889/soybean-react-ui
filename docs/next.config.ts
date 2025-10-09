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
  typescript: {
    ignoreBuildErrors: true
  }
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      'rehype-slug',
      ['rehype-autolink-headings', { behavior: 'wrap' }],
      [
        'rehype-pretty-code',
        {
          keepBackground: false,
          theme: {
            dark: 'github-dark',
            light: 'github-light'
          }
        }
      ]
    ],
    remarkPlugins: [
      'remark-gfm',
      [
        'skyroc-next-docs-plugin',
        {
          isRemark: true
        }
      ]
    ]
  }
});

export default withMDX(nextConfig);
