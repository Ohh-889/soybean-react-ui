import { chipVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { ChipContentProps } from '../types';

const ChipContent = forwardRef<HTMLSpanElement, ChipContentProps>((props, ref) => {
  const { className, color, position, size, ...rest } = props;

  const { content } = chipVariants({ color, position, size });

  const mergedCls = cn(content(), className);

  return (
    <span
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

ChipContent.displayName = 'ChipContent';

export default ChipContent;
