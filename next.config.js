const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const defaultConfig = {
  experimental: {
    reactRoot: "concurrent",
  },
};
const config =
  process.env.NODE_ENV === "development"
    ? {
        ...defaultConfig,
      }
    : withPWA({
        ...defaultConfig,
        pwa: {
          dest: "public",
          runtimeCaching,
        },
      });

module.exports = config;
