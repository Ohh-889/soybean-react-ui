import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './button-variants';
import type { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    asChild = false,
    children,
    className,
    color,
    disabled,
    fitContent,
    leading,
    loading,
    shadow,
    shape,
    size,
    trailing,
    variant,
    ...rest
  } = props;

  const isDisabled = loading || disabled;

  const Comp = asChild ? Slot : 'button';

  // eslint-disable-next-line sort/object-properties
  const mergedCls = cn(buttonVariants({ color, fitContent, shadow, size, shape, variant }), className);

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

export default Button;
