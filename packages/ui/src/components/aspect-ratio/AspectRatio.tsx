import { Root } from '@radix-ui/react-aspect-ratio';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import type { AspectRatioProps } from './types';

const AspectRatio = forwardRef<React.ElementRef<typeof Root>, AspectRatioProps>((props, ref) => {
  const { className, ...rest } = props;

  const mergedCls = cn(className);

  return (
    <Root
      ref={ref}
      {...rest}
      className={mergedCls}
    />
  );
});

AspectRatio.displayName = 'AspectRatio';

export default AspectRatio;
