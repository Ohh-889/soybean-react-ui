import { Trigger } from '@radix-ui/react-tabs';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { tabsVariants } from './tabs-variants';
import type { TabsTriggerProps } from './types';

const TabsTrigger = forwardRef<React.ElementRef<typeof Trigger>, TabsTriggerProps>((props, ref) => {
  const { className, enableIndicator = true, size, ...rest } = props;

  const { trigger } = tabsVariants({ enableIndicator, size });

  const mergedCls = cn(trigger(), className);

  return (
    <Trigger
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger;
