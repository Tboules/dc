import nextRoutes from "nextjs-routes/config";
const withRoutes = nextRoutes();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
  transpilePackages: ["lucide-react"],
};

export default withRoutes(nextConfig);
