import { Root } from '@radix-ui/react-tabs';
import { cn, tabsVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { TabsRootProps } from '../types';

const TabRoot = forwardRef<React.ElementRef<typeof Root>, TabsRootProps>((props, ref) => {
  const { className, fill, orientation, size, ...rest } = props;

  const mergedCls = cn(tabsVariants({ fill, orientation, size }), className);

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
