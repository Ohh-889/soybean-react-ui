import { Children, forwardRef } from 'react';

import { isFunction } from '@/lib/typed';

import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselNext from './CarouselNext';
import CarouselPrevious from './CarouselPrevious';
import CarouselRoot from './CarouselRoot';
import type { CarouselProps } from './types';

const Carousel = forwardRef<HTMLDivElement, CarouselProps>((props, ref) => {
  const { children, className, classNames, counts, nextProps, previousProps, size, ...rest } = props;

  return (
    <CarouselRoot
      className={className || classNames?.root}
      ref={ref}
      size={size}
      {...rest}
    >
      <CarouselContent
        classNames={classNames}
        size={size}
      >
        {counts &&
          Array.from({ length: counts }).map((_, index) => (
            <CarouselItem
              className={classNames?.item}
              key={index}
              size={size}
            >
              {isFunction(children) ? children(index) : Children.toArray(children)[index]}
            </CarouselItem>
          ))}
      </CarouselContent>

      <CarouselNext
        className={classNames?.next}
        size={size}
        {...nextProps}
      />

      <CarouselPrevious
        className={classNames?.previous}
        size={size}
        {...previousProps}
      />
    </CarouselRoot>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
