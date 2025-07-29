import { Root } from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

import Radio from './Radio';
import { radioVariants } from './radio-variants';
import type { RadioGroupProps } from './types';

const RadioGroup = (props: RadioGroupProps) => {
  const { className, classNames, color, items, orientation, size, ...rest } = props;

  const { group } = radioVariants({ orientation, size });

  const mergedCls = cn(group(), className || classNames?.group);

  return (
    <Root
      className={mergedCls}
      {...rest}
    >
      {items.map(item => (
        <Radio
          classNames={classNames}
          color={color}
          key={item.value}
          size={size}
          {...item}
        />
      ))}
    </Root>
  );
};

export default RadioGroup;
