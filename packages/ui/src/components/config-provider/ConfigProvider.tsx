'use client';

import { ConfigContext } from './context';
import type { ComponentConfig, ConfigProviderProps } from './types';

const COMPONENT_KEYS = ['accordion'] satisfies (keyof ComponentConfig)[];

export const ConfigProvider = (props: ConfigProviderProps) => {
  const { children, direction = 'ltr', size = 'md', theme = { color: 'default' }, ...rest } = props;

  const componentConfig = Object.fromEntries(
    COMPONENT_KEYS.map(key => [
      key,
      {
        ...rest[key],
        dir: direction,
        size
      }
    ])
  );

  return <ConfigContext.Provider value={componentConfig}>{children}</ConfigContext.Provider>;
};
