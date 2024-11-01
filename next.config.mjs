/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.britannica.com",
      },
      {
        protocol: "https",
        hostname: "domf5oio6qrcr.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "images.immediate.co.uk",
      },
    ],
  },
};

export default nextConfig;
