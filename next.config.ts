import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/user-creation-modal-app',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
