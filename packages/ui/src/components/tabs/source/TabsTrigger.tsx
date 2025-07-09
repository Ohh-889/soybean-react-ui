import { Trigger } from '@radix-ui/react-tabs';
import { cn, tabsVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { TabsTriggerProps } from '../types';

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
