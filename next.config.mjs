/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '*.blob.vercel-storage.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
        ],
    },
};

export default nextConfig;
