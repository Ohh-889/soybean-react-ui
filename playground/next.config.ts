import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['picsum.photos'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;

initOpenNextCloudflareForDev();
