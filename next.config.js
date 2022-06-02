/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dweb.link'],
  },
}

const withCSS = require('@zeit/next-css')

module.exports = { nextConfig, withCSS }
