import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['picsum.photos'] // 👈 添加允许的域名
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;

initOpenNextCloudflareForDev();
