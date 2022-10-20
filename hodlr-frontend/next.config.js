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
        source: "/api/users",
        destination: "https://hodlr-tracker.herokuapp.com/api/users",
      },
      {
        source: "/api/token",
        destination: "https://hodlr-tracker.herokuapp.com/api/token",
      },
      {
        source: "/api/users/me",
        destination: "https://hodlr-tracker.herokuapp.com/api/users/me",
      },
      {
        source: "/api/investment",
        destination: "https://hodlr-tracker.herokuapp.com/api/investment",
      },
      {
        source: "/api/coins_held",
        destination: "https://hodlr-tracker.herokuapp.com/api/coins_held",
      },
      {
        source: "/api/investments/:slug",
        destination:
          "https://hodlr-tracker.herokuapp.com/api/investments/:slug",
      },
      {
        source: "/api/coins_held/:slug",
        destination: "https://hodlr-tracker.herokuapp.com/api/coins_held/:slug",
      },
      {
        source: "/api/prices",
        destination: "https://hodlr-tracker.herokuapp.com/api/prices",
      },
    ];
  },
};

module.exports = nextConfig;
