const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
// TODO: update import https://github.com/contentlayerdev/contentlayer/issues/140
const { withContentlayer } = require('next-contentlayer');
/* const withFonts = require('next-fonts'); */
const withVanillaExtract = createVanillaExtractPlugin();

const withPlugins = nextConfig =>
  withContentlayer(withVanillaExtract(nextConfig));

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
  swcMinify: true,
};

module.exports = withPlugins(nextConfig);
