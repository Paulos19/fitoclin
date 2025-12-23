import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bzbrxkmhdxvh0b4p.public.blob.vercel-storage.com', // Domínio padrão do Vercel Blob
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Aumentando para 5MB para suportar uploads de imagem
    },
  },
};

export default nextConfig;
