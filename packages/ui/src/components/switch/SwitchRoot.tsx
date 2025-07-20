import { Switch } from '@radix-ui/react-switch';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { switchVariants } from './switch-varianst';
import type { SwitchRootProps } from './types';

const SwitchRoot = forwardRef<ComponentRef<typeof Switch>, SwitchRootProps>((props, ref) => {
  const { className, color, size, ...rest } = props;

  const { root } = switchVariants({ color, size });

  const mergedCls = cn(root(), className);

  return (
    <Switch
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

SwitchRoot.displayName = 'SwitchRoot';

export default SwitchRoot;
