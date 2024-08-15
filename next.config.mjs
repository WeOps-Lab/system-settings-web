import withAntdLess from 'next-plugin-antd-less';

export default withAntdLess({
  reactStrictMode: false, 
  async rewrites() {
    return [
      {
        source: '/reqApi/:path*',
        destination: 'http://yapi.canway.top/mock/3133/:path*', // 代理到后台服务器
      },
    ];
  },
  webpack(config) {
    return config;
  },
});
