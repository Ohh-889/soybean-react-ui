'use client';

import { OTPInputContext } from 'input-otp';
import { useContext } from 'react';

import { cn } from '@/lib/utils';

import { inputOTPVariants } from './input-otp-variants';
import type { InputOTPSlotProps } from './types';

const InputOTPSlot = (props: InputOTPSlotProps) => {
  const { className, index, mask, separate, size, ...rest } = props;

  const inputOTPContext = useContext(OTPInputContext);

  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  const { input } = inputOTPVariants({ isActive, separate, size });

  const mergedCls = cn(input(), className);

  return (
    <div
      className={mergedCls}
      data-has-fake-caret={hasFakeCaret}
      data-index={index}
      data-is-active={isActive}
      data-separate={separate}
      data-size={size}
      data-slot="input-otp-slot"
      {...rest}
    >
      {mask && char ? '●' : char}

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
};

export default InputOTPSlot;
