/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel's image optimizer may return 402 when optimization billing is unavailable.
    // The source assets are already web-ready and can be served directly from /public.
    unoptimized: true,
  },
};

export default nextConfig;
