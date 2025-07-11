import { Image } from '@radix-ui/react-avatar';
import { avatarVariants, cn } from '@soybean-react-ui/variants';
import type { ElementRef } from 'react';
import { forwardRef } from 'react';

import type { AvatarImageProps } from '../types';

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
