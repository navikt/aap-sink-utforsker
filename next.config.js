const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/søker/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
