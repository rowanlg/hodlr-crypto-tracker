/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/token",
        destination: "https://hodlr-tracker.herokuapp.com/api/token",
      },
    ];
  },
};

module.exports = nextConfig;
