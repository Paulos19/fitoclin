import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bzbrxkmhdxvh0b4p.public.blob.vercel-storage.com', // Domínio padrão do Vercel Blob (legado)
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', // UploadThing
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh', // UploadThing (novo formato)
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube thumbnails
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com'
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Aumentando para 5MB para suportar uploads de imagem
    },
  },
};

export default nextConfig;
