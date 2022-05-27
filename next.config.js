/**
 * @type {import('next').NextConfig}
 */

const path = require("path");
console.log("path", path);
console.log("__dirname", __dirname);
console.log("includePaths", [path.join(__dirname, "styles")]);

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname)],
  },
};

module.exports = nextConfig;
