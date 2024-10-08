/**
 * @type {import('next').NextConfig}
 */

const path = require("path");

const nextConfig = {
  /** 如果要使用sass，需加上這段設定 */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  /** 打包位置設定default: ./.next */
  // distDir: "build",
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
};

module.exports = nextConfig;
