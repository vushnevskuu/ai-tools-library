import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/ai-tools-library" : undefined,
  assetPrefix: process.env.GITHUB_ACTIONS ? "/ai-tools-library/" : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
