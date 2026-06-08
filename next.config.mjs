/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: '*.unsplash.com' },
      { hostname: 'ik.imagekit.io' },
      { hostname: 'picsum.photos' },
      { hostname: 'images.pexels.com' },
      { hostname: 'img.freepik.com' },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  crossOrigin: 'anonymous',
  distDir: '.next',
}
export default nextConfig
