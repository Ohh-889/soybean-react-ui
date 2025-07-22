'use client';

import { forwardRef } from 'react';

import { cn } from '@/lib';

import { keyboardKeyVariants } from './keyboard-key-variants';
import type { KeyboardKeyProps } from './types';
import { useKeyboardKey } from './use-keyboard-key';

export const KeyboardKey = forwardRef<HTMLDivElement, KeyboardKeyProps>((props, ref) => {
  const { children, className, size, value, variant, ...rest } = props;

  const { getKeyboardKey } = useKeyboardKey();

  const { item } = keyboardKeyVariants({ size, variant });

  const mergedCls = cn(item(), className);

  const getValues = () => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.map(v => getKeyboardKey(v)).filter(Boolean);
    }

    return [getKeyboardKey(value)!];
  };

  const values = getValues();

  return (
    <div
      className={mergedCls}
      ref={ref}
      {...rest}
    >
      {children ? children(values) : values.map(v => <span key={v}>{v}</span>)}
    </div>
  );
});

KeyboardKey.displayName = 'KeyboardKey';

export default KeyboardKey;
