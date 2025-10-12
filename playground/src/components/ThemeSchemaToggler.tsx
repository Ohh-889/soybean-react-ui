'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Icon, Switch } from 'skyroc-ui';

const ThemeSchemaToggler = () => {
  const { setTheme, theme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  const isDark = theme === 'dark';

  function changeTheme() {
    setTheme(isDark ? 'light' : 'dark');
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Switch
      checked={isDark}
      color="accent"
      defaultChecked={isDark}
      size="lg"
      onCheckedChange={changeTheme}
    >
      <Icon icon={isDark ? 'lucide:moon' : 'lucide:sun'} />
    </Switch>
  );
};

export default ThemeSchemaToggler;
