import nextRoutes from "nextjs-routes/config";
const withRoutes = nextRoutes();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {},
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
};

export default withRoutes(nextConfig);
