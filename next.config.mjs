/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      { hostname: '*.unsplash.com' },
      { hostname: 'ik.imagekit.io' },
      { hostname: 'picsum.photos' },
      {
        hostname: 'images.pexels.com',
      },
      {
        hostname: 'img.freepik.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  distDir: 'build',
  crossOrigin: 'anonymous',
}

export default nextConfig
