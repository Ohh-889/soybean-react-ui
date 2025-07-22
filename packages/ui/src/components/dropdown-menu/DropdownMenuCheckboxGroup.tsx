'use client';

import { Group } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import DropdownMenuCheckboxItem from './DropdownMenuCheckboxItem';
import DropdownMenuLabel from './DropdownMenuLabel';
import DropdownMenuSeparator from './DropdownMenuSeparator';
import { isLabel, isSeparator } from './shared';
import type { DropdownMenuCheckboxGroupProps } from './types';

const DropdownMenuCheckboxGroup = forwardRef<ComponentRef<typeof Group>, DropdownMenuCheckboxGroupProps>(
  (props, ref) => {
    const { checks, className, classNames, items, onChecksChange, size, ...rest } = props;

    return (
      <Group
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
            <DropdownMenuCheckboxItem
              key={String(index)}
              {...item}
              checked={checks?.includes(item?.textValue || '')}
              classNames={classNames}
              size={size}
              onCheckedChange={checked => {
                item.onCheckedChange?.(checked);

                if (checked) {
                  onChecksChange?.([...(checks || []), item?.textValue || '']);
                } else {
                  onChecksChange?.([...(checks || []).filter(check => check !== item?.textValue)]);
                }
              }}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </Group>
    );
  }
);

DropdownMenuCheckboxGroup.displayName = 'DropdownMenuCheckboxGroup';

export default DropdownMenuCheckboxGroup;
