import type { NextConfig } from "next";
import path from "path";

const wpUrl = process.env.WORDPRESS_API_URL ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
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
