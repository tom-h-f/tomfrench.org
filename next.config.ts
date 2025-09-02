import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Do not block builds on ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
