import { Item } from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

import { radioVariants } from './radio-variants';
import type { RadioGroupItemProps } from './types';

const RadioGroupItem = (props: RadioGroupItemProps) => {
  const { className, color, size, ...rest } = props;

  const { control } = radioVariants({ color, size });

  const mergedCls = cn(control(), className);

  return (
    <Item
      className={mergedCls}
      data-color={color}
      data-size={size}
      data-slot="radio-group-item"
      {...rest}
    />
  );
};

export default RadioGroupItem;
