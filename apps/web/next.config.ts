import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const wpUrl = process.env.WORDPRESS_API_URL ?? "http://localhost:8080";

const monorepoRoot = path.join(process.cwd(), "../..");
const isMonorepoCheckout =
  fs.existsSync(path.join(monorepoRoot, "pnpm-workspace.yaml")) &&
  fs.existsSync(path.join(process.cwd(), "package.json"));

const nextConfig: NextConfig = {
  ...(isMonorepoCheckout ? { outputFileTracingRoot: monorepoRoot } : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.spray166.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/wp/:path*",
        destination: `${wpUrl}/wp-json/:path*`,
      },
    ];
  },
};

export default nextConfig;
