
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
  },
  i18n: {
    locales: ['en', 'sh', 'nd'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;