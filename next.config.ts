import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["cdn2.thecatapi.com"],
    },
};

export default nextConfig;
