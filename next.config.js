/**
 * @type {import('next').NextConfig}
 */

const path = require("path");

const nextConfig = {
  /** sass設定 */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  /** 打包位置設定default: ./.next */
  distDir: "build",
};

module.exports = nextConfig;
