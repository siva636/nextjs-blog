/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/feed/1',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
