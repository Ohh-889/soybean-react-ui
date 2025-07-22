'use client';

import { RadioGroup } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import DropdownMenuLabel from './DropdownMenuLabel';
import DropdownMenuRadioItem from './DropdownMenuRadioItem';
import DropdownMenuSeparator from './DropdownMenuSeparator';
import { isLabel, isSeparator } from './shared';
import type { DropdownMenuRadioGroupProps } from './types';

const DropdownMenuCheckboxGroup = forwardRef<ComponentRef<typeof RadioGroup>, DropdownMenuRadioGroupProps>(
  (props, ref) => {
    const { className, classNames, items, size, ...rest } = props;

    return (
      <RadioGroup
        className={cn(className || classNames?.group)}
        ref={ref}
        {...rest}
      >
        {items.map((item, index) => {
          if (isLabel(item)) {
            return (
              <DropdownMenuLabel
                classNames={classNames}
                key={String(index)}
                size={size}
                {...item}
              >
                {item.label}
              </DropdownMenuLabel>
            );
          }

          if (isSeparator(item)) {
            return (
              <DropdownMenuSeparator
                className={classNames?.separator}
                key={String(index)}
                size={size}
              />
            );
          }

          return (
            <DropdownMenuRadioItem
              key={String(index)}
              {...item}
              classNames={classNames}
              size={size}
            >
              {item.label}
            </DropdownMenuRadioItem>
          );
        })}
      </RadioGroup>
    );
  }
);

DropdownMenuCheckboxGroup.displayName = 'DropdownMenuCheckboxGroup';

export default DropdownMenuCheckboxGroup;
