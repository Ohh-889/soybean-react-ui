import { Slot } from '@radix-ui/react-slot';
import { buttonVariants, cn } from '@soybean-react-ui/variants';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

import type { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    asChild = false,
    asIconButton,
    children,
    className,
    color = asIconButton ? 'carbon' : 'primary',
    disabled,
    fitContent,
    leading,
    loading,
    shadow,
    shape = asIconButton ? 'square' : 'auto',
    size,
    trailing,
    variant = asIconButton ? 'ghost' : 'solid',
    ...rest
  } = props;

  const isDisabled = loading || disabled;

  const Comp = asChild ? Slot : 'button';

  const mergedCls = cn(buttonVariants({ color, fitContent, shadow, shape, size, variant }), className);

  if (asChild) {
    return (
      <Comp
        className={mergedCls}
        disabled={isDisabled}
        ref={ref}
        {...rest}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={mergedCls}
      disabled={isDisabled}
      ref={ref}
      {...rest}
    >
      {loading ? leading || <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : leading}
      {children}
      {trailing}
    </Comp>
  );
});
Button.displayName = 'Button';
