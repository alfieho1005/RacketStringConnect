import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["pg", "pg-pool", "pgpass", "pg-connection-string", "pg-protocol"],
  async redirects() {
    return [
      {
        source: "/stringers/:slug(.*-pb-court)",
        destination: "/pickleball",
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Tell webpack to leave pg and its deps to Node.js require at runtime
      const pgModules = ["pg", "pg-pool", "pgpass", "pg-connection-string", "pg-protocol"];
      const existing = Array.isArray(config.externals) ? config.externals : [config.externals].filter(Boolean);
      config.externals = [...existing, ...pgModules];
    }
    return config;
  },
};

export default nextConfig;

