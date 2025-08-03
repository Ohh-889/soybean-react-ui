'use client';

import { OTPInput } from 'input-otp';
import { type ComponentRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { inputOTPVariants } from './input-otp-variants';
import type { InputOTPRootProps } from './types';

const InputOtpRoot = forwardRef<ComponentRef<typeof OTPInput>, InputOTPRootProps>((props, ref) => {
  const { className, size: _, ...rest } = props;

  const { root } = inputOTPVariants();

  const mergedCls = cn(root(), className);

  return (
    <OTPInput
      className={mergedCls}
      data-slot="input-otp-root"
      ref={ref}
      {...rest}
    />
  );
});

InputOtpRoot.displayName = 'InputOtpRoot';

export default InputOtpRoot;
