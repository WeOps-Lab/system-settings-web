'use client';

import { Switch } from 'antd';
import { useTheme } from '../../context/theme';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleChange = (checked: boolean) => {
    /* eslint-disable-next-line */
    setTheme(checked);
  };

  return (
    <Switch
      checked={theme.token?.colorPrimary === '#001529'}
      onChange={handleChange}
    />
  );
}
