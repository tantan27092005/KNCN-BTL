/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        HF_API_KEY: process.env.HF_API_KEY,
    },
};
export default nextConfig;
