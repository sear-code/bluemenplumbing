/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/**',
      },
    ],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/services/bathroom-rough-in',
        destination: '/services/bathroom-plumbing',
        permanent: true,
      },
      {
        source: '/services/bathroom-finishing',
        destination: '/services/bathroom-plumbing',
        permanent: true,
      },
      {
        source: '/services/laundry-connections',
        destination: '/services/installations',
        permanent: true,
      },
      {
        source: '/services/repairs-troubleshooting',
        destination: '/services/leak-repairs',
        permanent: true,
      },
      {
        source: '/services/kitchen-plumbing',
        destination: '/services/kitchen-plumbing-v2',
        permanent: true,
      },
    ];
  },
}

export default nextConfig

