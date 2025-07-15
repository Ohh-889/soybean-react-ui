import { Root } from '@radix-ui/react-label';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { labelVariants } from './label-variants';
import type { LabelProps } from './types';

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
