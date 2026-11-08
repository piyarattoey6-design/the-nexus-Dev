import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...ค่าเดิมของคุณ (เช่น cacheComponents) คงไว้
  async redirects() {
    return [
      {
        source: "/",
        destination: "/member",
        permanent: false,
      },
    ];
  },
};

export default nextConfig; 