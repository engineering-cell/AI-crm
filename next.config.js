/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
