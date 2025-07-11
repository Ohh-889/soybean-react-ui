import { Root } from '@radix-ui/react-aspect-ratio';
import { cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AspectRatioProps } from '../type';

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
