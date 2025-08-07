import { NextConfig } from "next";

const isProdRemoveConsoleOption =
  process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false;

const nextConfig: NextConfig = {
  reactStrict: true,
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  compiler: {
    removeConsole: isProdRemoveConsoleOption,
  },
};

module.exports = nextConfig;
