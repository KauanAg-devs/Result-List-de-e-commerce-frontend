/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.skhouston.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "studios-tc.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "hips.hearstapps.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "teamheretics.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
