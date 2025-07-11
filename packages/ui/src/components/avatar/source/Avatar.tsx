import { Image } from '@radix-ui/react-avatar';
import type { ElementRef } from 'react';
import { forwardRef } from 'react';

import type { AvatarProps } from '../types';

import AvatarFallback from './AvatarFallback';
import AvatarImage from './AvatarImage';
import AvatarRoot from './AvatarRoot';

const Avatar = forwardRef<ElementRef<typeof Image>, AvatarProps>((props, ref) => {
  const { className, classNames, delayMs, fallback, size, ...rest } = props;

  return (
    <AvatarRoot
      className={classNames?.root}
      size={size}
    >
      <AvatarImage
        className={className || classNames?.image}
        ref={ref}
        {...rest}
      />

      <AvatarFallback
        className={classNames?.fallback}
        delayMs={delayMs}
      >
        {fallback}
      </AvatarFallback>
    </AvatarRoot>
  );
});

Avatar.displayName = Image.displayName;

export default Avatar;
