import { isFunction } from '@/lib/typed';

import ToggleGroupItem from './ToggleGroupItem';
import ToggleGroupRoot from './ToggleGroupRoot';
import type { ToggleGroupProps } from './types';

const ToggleGroup = (props: ToggleGroupProps) => {
  const { className, classNames, itemRender, items, size, variant, ...rest } = props;

  return (
    <ToggleGroupRoot
      {...rest}
      className={[classNames?.groupRoot, className]}
      size={size}
    >
      {items.map(item => {
        const { label, ...restItem } = item;

        return (
          <ToggleGroupItem
            key={item.value}
            size={size}
            variant={variant}
            {...restItem}
          >
            {isFunction(itemRender) ? itemRender(item) : label}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroupRoot>
  );
};

export default ToggleGroup;
