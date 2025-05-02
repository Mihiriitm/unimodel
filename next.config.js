/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ['framer-motion', 'next-themes'],
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    appDir: true,
  },
  compiler: {
    removeConsole: true
  }
}

module.exports = nextConfig; 