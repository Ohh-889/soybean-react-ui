import { Content } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuContentProps } from './types';

const DropdownMenuContent = forwardRef<ComponentRef<typeof Content>, DropdownMenuContentProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { content } = menuVariants({ size });

  const mergedCls = cn(content(), className);

  return (
    <Content
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

export default DropdownMenuContent;
