import { SubContent } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuSubContentProps } from './types';

const DropdownMenuSubContent = forwardRef<ComponentRef<typeof SubContent>, DropdownMenuSubContentProps>(
  (props, ref) => {
    const { className, size, ...rest } = props;

    const { content } = menuVariants({ size });

    const mergedCls = cn(content(), className);

    return (
      <SubContent
        className={mergedCls}
        ref={ref}
        {...rest}
      />
    );
  }
);

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

export default DropdownMenuSubContent;
