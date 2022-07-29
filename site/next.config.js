/* const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
}); */
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withPlugins = require('next-compose-plugins');
// TODO: update import https://github.com/contentlayerdev/contentlayer/issues/140
const { withContentlayer } = require('next-contentlayer');
/* const withFonts = require('next-fonts'); */
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        destination: '/docs/introduction',
        permanent: false,
        source: '/docs',
      },
    ];
  },
};

module.exports = withPlugins(
  [withVanillaExtract, withContentlayer],
  nextConfig
);
