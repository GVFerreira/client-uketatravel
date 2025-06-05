import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ukvistos.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'website-ukvistos-minio.usmpj4.easypanel.host',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
