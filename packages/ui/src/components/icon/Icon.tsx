'use client';

import { Icon as IconifyIcon } from '@iconify/react';

import { useComponentConfig } from '../config-provider/context';

import type { IconProps } from './types';

const Icon = (props: IconProps) => {
  const contextConfig = useComponentConfig('icon');

  const { height = contextConfig?.height ?? '1.25em', width = contextConfig?.width ?? '1.25em', ...rest } = props;

  const mergedProps = {
    ...contextConfig,
    height,
    width,
    ...rest
  };

  return <IconifyIcon {...mergedProps} />;
};

Icon.displayName = 'Icon';

export default Icon;
