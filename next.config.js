/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/unimodel',
  assetPrefix: '/unimodel/',
  transpilePackages: ['framer-motion', 'next-themes'],
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true
  },
  compiler: {
    removeConsole: true
  }
}

module.exports = nextConfig; 