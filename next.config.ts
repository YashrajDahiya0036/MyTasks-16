import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/**',
			}
		]
	},

	reactCompiler: true,
	cacheComponents: true,
	experimental: {
		turbopackFileSystemCacheForDev: true,
		useCache: true,
	},

	// This is required to support PostHog trailing slash API requests
	skipTrailingSlashRedirect: true,

	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://eu-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ingest/:path*",
				destination: "https://eu.i.posthog.com/:path*",
			},
		];
	},
};

export default nextConfig;
