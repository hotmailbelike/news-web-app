/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/Home',
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
