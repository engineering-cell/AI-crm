/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.LOCAL_CLONE_FRONTEND === 'true' ? { distDir: '.next-clone' } : {}),
  experimental: {
    agentUpgrade: 'security',
    // Next 16 turns this on by default. The on-disk Turbopack cache under
    // .next/dev grew to ~21GB here and hangs an 8GB machine when `next dev` opens it.
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
