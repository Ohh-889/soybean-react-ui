'use client';
import { forwardRef } from 'react';

import type { TabsOptionData, TabsProps } from './types';

import TabsContent from './TabsContent';
import TabsList from './TabsList';
import Root from './TabsRoot';
import TabsTrigger from './TabsTrigger';

const Tabs = forwardRef<React.ElementRef<typeof Root>, TabsProps<TabsOptionData>>((props, ref) => {
  const {
    className,
    classNames,
    dir,
    enableIndicator = true,
    forceMountContent,
    items,
    loop,
    orientation = 'horizontal',
    size,
    value,
    ...rest
  } = props;

  return (
    <Root
      className={[className, classNames?.root]}
      dir={dir}
      ref={ref}
      size={size}
      value={value}
      {...rest}
    >
      <TabsList
        className={classNames?.list}
        dir={dir}
        enableIndicator={enableIndicator}
        loop={loop}
        orientation={orientation}
        size={size}
        value={value}
        classNames={{
          indicator: classNames?.indicator,
          indicatorRoot: classNames?.indicatorRoot
        }}
      >
        {items.map(item => (
          <TabsTrigger
            className={classNames?.trigger}
            dir={dir}
            disabled={item.disabled}
            enableIndicator={enableIndicator}
            key={item.value}
            size={size}
            value={item.value}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map(item => (
        <TabsContent
          className={classNames?.content}
          dir={dir}
          forceMount={forceMountContent}
          key={item.value}
          orientation={orientation}
          size={size}
          value={item.value}
        >
          {typeof item.children === 'function' ? item.children({ active: item.value === value, item }) : item.children}
        </TabsContent>
      ))}
    </Root>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
