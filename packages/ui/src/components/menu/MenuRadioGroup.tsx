'use client';

import { RadioGroup as _RadioGroup } from '@radix-ui/react-dropdown-menu';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib';

import MenuLabel from './MenuLabel';
import MenuRadioItem from './MenuRadioItem';
import MenuSeparator from './MenuSeparator';
import { isLabel, isSeparator } from './shared';
import type { MenuRadioGroupProps } from './types';

const MenuRadioGroup = forwardRef<ComponentRef<typeof _RadioGroup>, MenuRadioGroupProps>((props, ref) => {
  const {
    className,
    classNames,
    component: RadioItem = MenuRadioItem,
    groupComponent: RadioGroup = _RadioGroup,
    items,
    labelComponent: LabelComponent = MenuLabel,
    separatorComponent: SeparatorComponent = MenuSeparator,
    size,
    ...rest
  } = props;

  return (
    <RadioGroup
      className={cn(className || classNames?.group)}
      ref={ref}
      {...rest}
    >
      {items.map((item, index) => {
        if (isLabel(item)) {
          return (
            <LabelComponent
              classNames={classNames}
              key={String(index)}
              size={size}
              {...item}
            >
              {item.label}
            </LabelComponent>
          );
        }

        if (isSeparator(item)) {
          return (
            <SeparatorComponent
              {...item}
              className={classNames?.separator}
              key={String(index)}
              size={size}
            />
          );
        }

        return (
          <RadioItem
            key={String(index)}
            {...item}
            classNames={classNames}
            size={size}
          >
            {item.label}
          </RadioItem>
        );
      })}
    </RadioGroup>
  );
});

MenuRadioGroup.displayName = 'MenuRadioGroup';

export default MenuRadioGroup;
