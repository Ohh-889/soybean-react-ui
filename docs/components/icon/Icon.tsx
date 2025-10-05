'use client';

import { Icon as IconifyIcon } from '@iconify/react';

import type { IconProps } from './types';

const Icon = (props: IconProps) => {
  const { height = '1.25em', width = '1.25em', ...rest } = props;

  const mergedProps = {
    height,
    width,
    ...rest
  };

  return <IconifyIcon {...mergedProps} />;
};

Icon.displayName = 'Icon';

export default Icon;
