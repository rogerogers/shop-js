import { withNextIntl } from '@rogerogers/i18n/init';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.ltwebstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'ro-scontent.oss-us-west-1.aliyuncs.com',
      },
      {
        protocol: 'https',
        hostname: 'cbu01.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'nhci-aigc.oss-cn-zhangjiakou.aliyuncs.com',
      },
      {
        protocol: 'https',
        hostname: 'global-img-cdn.1688.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
