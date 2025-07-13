import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['picsum.photos'] // 👈 添加允许的域名
  }
};

export default nextConfig;

initOpenNextCloudflareForDev();
