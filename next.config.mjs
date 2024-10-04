/** @type {import('next').NextConfig} */
const nextConfig = {
	// experimental: {
	// 	serverActions: true
	// },
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true,
			},
			{
				source: "/app",
				destination: "/dashboard",
				permanent: true,
			},
			{
				source: "/login",
				destination: "/auth/login",
				permanent: true,
			},
			{
				source: "/sign-up",
				destination: "/auth/sign-up",
				permanent: true,
			},
			{
				source: "/register",
				destination: "/auth/sign-up",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
