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
    ],
  },
};

export default nextConfig;
