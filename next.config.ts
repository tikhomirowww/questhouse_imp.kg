import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["xlsx"],
  images: {
    domains: [],
  },
};

export default nextConfig;
