import { SubTrigger as _SubTrigger } from '@radix-ui/react-menu';
import { ChevronRight } from 'lucide-react';
import type { ComponentRef } from 'react';
import { forwardRef, isValidElement } from 'react';

import { withClassName } from '@/lib/compose-props';
import { cn } from '@/lib/utils';

import { menuVariants } from './menu-variants';
import type { MenuSubTriggerProps } from './types';

const MenuSubTrigger = forwardRef<ComponentRef<typeof _SubTrigger>, MenuSubTriggerProps>((props, ref) => {
  const {
    children,
    className,
    classNames,
    component: SubTrigger = _SubTrigger,
    leading,
    size,
    trailing,
    triggerIcon,
    ...rest
  } = props;

  const { itemIcon, subTrigger, subTriggerIcon } = menuVariants({ size });

  const mergedCls = cn(subTrigger(), className);

  const mergedTrailingIconCls = cn(subTriggerIcon(), classNames?.subTriggerIcon);

  return (
    <SubTrigger
      className={mergedCls}
      ref={ref}
      {...rest}
    >
      {isValidElement(leading) ? withClassName(leading, itemIcon()) : leading}

      {children}

      {trailing}

      {triggerIcon || <ChevronRight className={mergedTrailingIconCls} />}
    </SubTrigger>
  );
});

MenuSubTrigger.displayName = 'MenuSubTrigger';

export default MenuSubTrigger;
