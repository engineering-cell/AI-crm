/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.LOCAL_CLONE_FRONTEND === 'true' ? { distDir: '.next-clone' } : {}),
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
