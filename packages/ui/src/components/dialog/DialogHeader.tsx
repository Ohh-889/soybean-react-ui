import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { dialogVariants } from './dialog-variants';
import type { DialogHeaderProps } from './types';

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { header } = dialogVariants({ size });

  const mergedClass = cn(header(), className);
  return (
    <header
      {...rest}
      className={mergedClass}
      data-slot="dialog-header"
      ref={ref}
    />
  );
});

DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
