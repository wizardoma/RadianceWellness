/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@radiance/ui", "@radiance/utils", "@radiance/types", "@radiance/mock-data"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;
