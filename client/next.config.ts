import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [

      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/v1/uploads/**", // Allow all images in the API uploads path
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**", // Allow all images inside uploads
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/v1/default-avatar.png", // Explicitly allow default-avatar.png
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/api/v1/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/api/v1/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/api/v1/**', // 👈 this covers your image paths
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
    ],
   
  },
};

export default nextConfig;
