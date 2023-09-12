/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "randomuser.me",
      "127.0.0.1",
      "firebasestorage.googleapis.com"
    ]
  }
}

module.exports = nextConfig
