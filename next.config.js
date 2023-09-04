/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({extension: /\.mdx?$/})
const nextConfig = {}

module.exports = withMDX(nextConfig)
