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
        source: "/api",
        destination: "https://hodlr-tracker.herokuapp.com/api",
      },
    ];
  },
};

module.exports = nextConfig;
