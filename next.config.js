/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Para habilitar el panel de control en producción
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/index.html',
      },
    ];
  },
  // Configuración para Vercel
  experimental: {
    serverActions: true,
  },
  // Configuración para TypeScript
  typescript: {
    ignoreBuildErrors: true, // Temporal para el despliegue
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporal para el despliegue
  },
};

module.exports = nextConfig;
