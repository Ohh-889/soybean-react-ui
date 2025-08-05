import { Indicator, Root } from '@radix-ui/react-progress';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { progressVariants } from './progress-variants';
import type { ProgressProps } from './types';

const Progress = forwardRef<ComponentRef<typeof Root>, ProgressProps>((props, ref) => {
  const { className, classNames, color, size, value, ...rest } = props;

  const { indicator, root } = progressVariants({ color, size });

  const mergedCls = {
    indicator: cn(indicator(), classNames?.indicator),
    root: cn(root(), className, classNames?.root)
  };

  return (
    <Root
      className={mergedCls.root}
      data-slot="progress-root"
      ref={ref}
      value={value}
      {...rest}
    >
      <Indicator
        className={mergedCls.indicator}
        data-slot="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  );
});

Progress.displayName = 'Progress';

export default Progress;
