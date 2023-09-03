/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";
const nextConfig = {
  images: {
    domains: ["flagcdn.com"],
  },
  compiler: {
    removeConsole: isProduction,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
