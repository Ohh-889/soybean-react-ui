import { Root } from '@radix-ui/react-avatar';
import { avatarVariants, cn } from '@soybean-react-ui/variants';
import type { ElementRef } from 'react';
import { forwardRef } from 'react';

import type { AvatarRootProps } from '../types';

const AvatarRoot = forwardRef<ElementRef<typeof Root>, AvatarRootProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { root } = avatarVariants({ size });

  const mergedCls = cn(root(), className);

  return (
    <Root
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

AvatarRoot.displayName = Root.displayName;

export default AvatarRoot;
