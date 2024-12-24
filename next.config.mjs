/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      { hostname: '*.unsplash.com' },
      { hostname: 'ik.imagekit.io' },
      { hostname: 'picsum.photos' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
  },

  distDir: 'build',
  crossOrigin: 'anonymous',
}

export default nextConfig
