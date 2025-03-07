import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rn6lu3p0e2.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
