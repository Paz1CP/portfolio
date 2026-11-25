import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/avif"],
    qualities: [75, 85],
    minimumCacheTTL: 86400,
    localPatterns: [
      { pathname: "**", search: "" },
      {
        pathname: "/images/experience/CookPilot/cookpilot_logo.png",
        search: "?v=20261125",
      },
      {
        pathname: "/images/experience/JM/jobmatch_orange.png",
        search: "?v=20261125",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
