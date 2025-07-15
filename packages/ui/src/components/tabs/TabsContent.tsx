import { TabsContent as Content } from '@radix-ui/react-tabs';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { tabsVariants } from './tabs-variants';
import type { TabsContentProps } from './types';

const TabsContent = forwardRef<React.ElementRef<typeof Content>, TabsContentProps>((props, ref) => {
  const { className, orientation, size, ...rest } = props;

  const { content } = tabsVariants({ orientation, size });

  const mergedCls = cn(content(), className);

  return (
    <Content
      className={mergedCls}
      {...rest}
      ref={ref}
    />
  );
});

TabsContent.displayName = 'TabsContent';

export default TabsContent;
