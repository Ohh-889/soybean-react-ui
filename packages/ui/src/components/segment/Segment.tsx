import type { Root } from '@radix-ui/react-tabs';
import { forwardRef } from 'react';

import SegmentList from '../tabs/TabsList';
import SegmentRoot from '../tabs/TabsRoot';
import SegmentTrigger from '../tabs/TabsTrigger';

import type { SegmentOptionData, SegmentProps } from './types';

const Segment = forwardRef<React.ComponentRef<typeof Root>, SegmentProps<SegmentOptionData>>((props, ref) => {
  const {
    className,
    classNames,
    dir,
    enableIndicator = true,
    items,
    loop,
    orientation = 'horizontal',
    size,
    value,
    ...rest
  } = props;

  return (
    <SegmentRoot
      className={[className, classNames?.root]}
      dir={dir}
      ref={ref}
      size={size}
      value={value}
      {...rest}
    >
      <SegmentList
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
          <SegmentTrigger
            className={classNames?.trigger}
            dir={dir}
            disabled={item.disabled}
            enableIndicator={enableIndicator}
            key={item.value}
            size={size}
            value={item.value}
          >
            {item.label}
          </SegmentTrigger>
        ))}
      </SegmentList>
    </SegmentRoot>
  );
});

Segment.displayName = 'Segment';

export default Segment;
