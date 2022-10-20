/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  async redirects() {
    return [
      {
        source: "/api/token",
        destination: process.env.SERVER_URL + "/api/token",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
