import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { inputVariants } from './input-variants';
import type { InputProps } from './types';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const mergedCls = cn(inputVariants({ size }), className);

  return (
    <input
      className={mergedCls}
      data-slot="input"
      ref={ref}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
