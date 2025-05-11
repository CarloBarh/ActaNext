import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["http://localhost:3000", "http://192.168.79.128:3000"],
  },
};

export default nextConfig;
