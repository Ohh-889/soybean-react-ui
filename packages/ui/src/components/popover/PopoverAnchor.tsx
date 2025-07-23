import { Anchor } from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

import { popoverVariants } from './popover-varianst';
import type { PopoverAnchorProps } from './types';

const PopoverAnchor = (props: PopoverAnchorProps) => {
  const { className, ...rest } = props;

  const { anchor } = popoverVariants();

  const mergedCls = cn(anchor(), className);

  return (
    <Anchor
      className={mergedCls}
      data-slot="combobox-anchor"
      {...rest}
    />
  );
};

export default PopoverAnchor;
