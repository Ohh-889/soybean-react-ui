import type { ComponentRef } from 'react';
import React, { forwardRef } from 'react';

import SliderRange from './SliderRange';
import SliderRoot from './SliderRoot';
import SliderThumb from './SliderThumb';
import SliderTrack from './SliderTrack';
import type { SliderProps } from './types';

const Slider = forwardRef<ComponentRef<typeof SliderRoot>, SliderProps>((props, ref) => {
  const { className, classNames, color, defaultValue, size, value, ...rest } = props;

  return (
    <SliderRoot
      className={className || classNames?.root}
      ref={ref}
      size={size}
      {...rest}
    >
      <SliderTrack
        className={classNames?.track}
        color={color}
        size={size}
      >
        <SliderRange
          className={classNames?.range}
          color={color}
        />
      </SliderTrack>

      {(defaultValue || value)?.map((_, index) => (
        <SliderThumb
          className={classNames?.thumb}
          color={color}
          key={String(index)}
          size={size}
        />
      ))}
    </SliderRoot>
  );
});

Slider.displayName = 'Slider';

export default Slider;
