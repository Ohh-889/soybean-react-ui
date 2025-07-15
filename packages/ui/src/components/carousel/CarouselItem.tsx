'use client';

import { carouselVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import { useCarousel } from './context';
import type { CarouselItemProps } from './types';

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>((props, ref) => {
  const { className, size, ...rest } = props;

  const { orientation } = useCarousel();

  const { item } = carouselVariants({ orientation, size });

  const itemClassName = cn(item(), className);

  return (
    <div
      aria-roledescription="slide"
      className={itemClassName}
      ref={ref}
      role="group"
      {...rest}
    />
  );
});

CarouselItem.displayName = 'CarouselItem';

export default CarouselItem;
