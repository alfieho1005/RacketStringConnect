const nextConfig = require("eslint-config-next");

const ignoreDefaults = [".next/**", "out/**", "build/**", "next-env.d.ts"];

module.exports = {
  ...nextConfig,
  ignorePatterns: [
    ...(nextConfig.ignorePatterns ?? []),
    ...ignoreDefaults,
  ],
};
