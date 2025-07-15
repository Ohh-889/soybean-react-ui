import { Image } from '@radix-ui/react-avatar';
import type { ElementRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { avatarVariants } from './avatar-variants';
import type { AvatarImageProps } from './types';

const AvatarImage = forwardRef<ElementRef<typeof Image>, AvatarImageProps>((props, ref) => {
  const { className, ...rest } = props;

  const { image } = avatarVariants();

  const mergedCls = cn(image(), className);

  return (
    <Image
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

AvatarImage.displayName = Image.displayName;

export default AvatarImage;
