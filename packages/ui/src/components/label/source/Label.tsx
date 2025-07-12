import { Root } from '@radix-ui/react-label';
import { cn, labelVariants } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { LabelProps } from '../types';

const Label = forwardRef<React.ComponentRef<typeof Root>, LabelProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const mergedCls = cn(labelVariants({ size }), className);

  return (
    <Root
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

Label.displayName = Root.displayName;

export default Label;
