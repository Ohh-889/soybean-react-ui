import { Content } from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

import { sheetVariants } from './sheet-variants';
import type { SheetContentProps } from './types';

const SheetContent = (props: SheetContentProps) => {
  const { className, side, ...rest } = props;

  const { content } = sheetVariants({ side });

  const mergedCls = cn(content(), className);

  return (
    <Content
      className={mergedCls}
      data-side={side}
      data-slot="sheet-content"
      {...rest}
    />
  );
};

export default SheetContent;
