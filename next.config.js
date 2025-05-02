/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/unimodel',
  assetPrefix: '/unimodel/',
  trailingSlash: true
}

module.exports = nextConfig; 