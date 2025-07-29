import { Indicator } from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

import { radioVariants } from './radio-variants';
import type { RadioIndicatorProps } from './types';

const RadioIndicator = (props: RadioIndicatorProps) => {
  const { className, color, ...rest } = props;

  const { indicator } = radioVariants({ color });

  const mergedCls = cn(indicator(), className);

  return (
    <Indicator
      className={mergedCls}
      data-color={color}
      data-slot="radio-indicator"
      {...rest}
    />
  );
};

export default RadioIndicator;
