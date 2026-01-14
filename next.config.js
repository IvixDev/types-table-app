const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: isProd ? '/pokemon-table-types' : '',
  assetPrefix: isProd ? '/pokemon-table-types' : undefined,
}

module.exports = nextConfig
