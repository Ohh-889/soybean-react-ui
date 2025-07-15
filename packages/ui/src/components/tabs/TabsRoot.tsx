import { Root } from '@radix-ui/react-tabs';
import { cn, tabsVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { TabsRootProps } from './types';

const TabRoot = forwardRef<React.ElementRef<typeof Root>, TabsRootProps>((props, ref) => {
  const { className, fill, orientation, size, ...rest } = props;

  const { root } = tabsVariants({ fill, orientation, size });

  const mergedCls = cn(root(), className);

  return (
    <Root
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

TabRoot.displayName = 'TabRoot';

export default TabRoot;
