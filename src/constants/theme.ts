import { ThemeConfig } from 'antd/es/config-provider/context';

const lightTheme: ThemeConfig = {
  cssVar: true,
  token: {
    colorPrimary: '#1890ff',
    colorText: '#000000',
    colorBgBase: '#ffffff',
  },
};

const darkTheme: ThemeConfig = {
  cssVar: true,
  token: {
    colorPrimary: '#001529',
    colorText: '#ffffff',
    colorBgBase: '#000000',
  },
};

export { lightTheme, darkTheme }