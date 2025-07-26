import { cn } from '@/lib/utils';

import { drawerVariants } from './drawer-variants';
import type { DrawerContentBodyProps } from './types';

const DrawerContentBody = (props: DrawerContentBodyProps) => {
  const { className, size, ...rest } = props;

  const { contentBody } = drawerVariants({ size });

  const mergedCls = cn(contentBody(), className);
  return (
    <div
      className={mergedCls}
      {...rest}
    />
  );
};

export default DrawerContentBody;
