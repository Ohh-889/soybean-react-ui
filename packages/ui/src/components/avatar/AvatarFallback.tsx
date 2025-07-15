import { Fallback } from '@radix-ui/react-avatar';
import type { ElementRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { avatarVariants } from './avatar-variants';
import type { AvatarFallbackProps } from './types';

const AvatarFallback = forwardRef<ElementRef<typeof Fallback>, AvatarFallbackProps>((props, ref) => {
  const { className, ...rest } = props;

  const { fallback } = avatarVariants();

  const mergedCls = cn(fallback(), className);

  return (
    <Fallback
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

AvatarFallback.displayName = Fallback.displayName;

export default AvatarFallback;
