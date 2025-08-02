import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for better mobile performance
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
  
  // Compress images and optimize static assets
  compress: true,
  
  // Add headers for better caching and performance
  async headers() {
    return [
      {
        source: '/(.*)\\.(glb|obj|mtl)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize for client-side performance
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
