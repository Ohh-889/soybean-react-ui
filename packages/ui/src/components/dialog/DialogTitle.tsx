import { Title as _Title } from '@radix-ui/react-dialog';
import { type ComponentRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { dialogVariants } from './dialog-variants';
import type { DialogTitleProps } from './types';

const DialogTitle = forwardRef<ComponentRef<typeof _Title>, DialogTitleProps>((props, ref) => {
  const { className, component: Title = _Title, size, ...rest } = props;

  const { title } = dialogVariants({ size });

  const mergedClass = cn(title(), className);
  return (
    <Title
      {...rest}
      className={mergedClass}
      data-slot="dialog-title"
      ref={ref}
    />
  );
});

DialogTitle.displayName = 'DialogTitle';

export default DialogTitle;
