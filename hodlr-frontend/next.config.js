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
        source: "/api/:slug*",
        destination: "http://localhost:8000/api/:slug*",
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:slug*",
  //       destination: "https://hodlr-tracker.herokuapp.com/api/:slug*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
