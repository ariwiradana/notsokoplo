/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "flowbite.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
