/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
