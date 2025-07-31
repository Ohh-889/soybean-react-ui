'use client';

import { cn } from '@/lib';

import { keyboardKeyVariants } from './keyboard-key-variants';
import type { KeyboardKeyProps } from './types';
import { useKeyboardKey } from './use-keyboard-key';

export const KeyboardKey = (props: KeyboardKeyProps) => {
  const { children, className, size, value, variant, ...rest } = props;

  const { item } = keyboardKeyVariants({ size, variant });

  const mergedCls = cn(item(), className);

  const { getKeyboardKey } = useKeyboardKey();

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
      data-size={size}
      data-slot="keyboard-key"
      data-variant={variant}
      {...rest}
    >
      {children ? children(values) : values.map(v => <span key={v}>{v}</span>)}
    </div>
  );
};

export default KeyboardKey;
