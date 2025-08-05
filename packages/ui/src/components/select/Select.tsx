import { Root } from '@radix-ui/react-select';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import SelectContent from './SelectContent';
import SelectOption from './SelectOption';
import SelectTrigger from './SelectTrigger';
import type { SelectProps } from './types';

const Select = forwardRef<ComponentRef<typeof SelectContent>, SelectProps>((props, ref) => {
  const { classNames, contentProps, indicatorIcon, items, size, triggerProps, ...rest } = props;

  return (
    <Root
      data-slot="select-root"
      {...rest}
    >
      <SelectTrigger {...triggerProps} />

      <SelectContent
        classNames={classNames}
        ref={ref}
        {...contentProps}
      >
        {items.map((item, index) => (
          <SelectOption
            classNames={classNames}
            indicatorIcon={indicatorIcon}
            item={item}
            key={String(index)}
            size={size}
          />
        ))}
      </SelectContent>
    </Root>
  );
});

Select.displayName = 'Select';

export default Select;
