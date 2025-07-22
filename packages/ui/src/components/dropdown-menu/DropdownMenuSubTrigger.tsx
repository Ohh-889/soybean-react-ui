import { SubTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuSubTriggerProps } from './types';

const DropdownMenuSubTrigger = forwardRef<ComponentRef<typeof SubTrigger>, DropdownMenuSubTriggerProps>(
  (props, ref) => {
    const { children, className, classNames, leading, size, trailing, trailingIcon, ...rest } = props;

    const { subTrigger, subTriggerIcon } = menuVariants({ size });

    const mergedCls = cn(subTrigger(), className);

    const mergedTrailingIconCls = cn(subTriggerIcon(), classNames?.subTriggerIcon);

    return (
      <SubTrigger
        className={mergedCls}
        ref={ref}
        {...rest}
      >
        {leading}

        {children}

        {trailing}

        {trailingIcon || <ChevronRight className={mergedTrailingIconCls} />}
      </SubTrigger>
    );
  }
);

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export default DropdownMenuSubTrigger;
