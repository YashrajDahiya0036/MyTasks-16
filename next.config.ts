import type { NextConfig } from "next";
import { Niconne } from "next/font/google";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
};

export default nextConfig;
