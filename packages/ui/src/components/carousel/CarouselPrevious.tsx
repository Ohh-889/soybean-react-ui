'use client';

import { carouselVariants, cn } from '@soybean-react-ui/variants';
import { ChevronLeft } from 'lucide-react';
import { forwardRef } from 'react';

import { Button } from '../button';
import { useCarousel } from './context';
import type { CarouselNextProps } from './types';

const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>((props, ref) => {
  const { children, className, disabled, shape = 'circle', size, variant = 'pure', ...rest } = props;

  const { canScrollPrev, orientation, scrollPrev } = useCarousel();

  const { previous } = carouselVariants({ orientation, size });

  const previousClassName = cn(previous(), className);

  return (
    <Button
      className={previousClassName}
      disabled={!canScrollPrev || disabled}
      ref={ref}
      shape={shape}
      size={size}
      variant={variant}
      onClick={scrollPrev}
      {...rest}
    >
      {children || <ChevronLeft />}
    </Button>
  );
});

CarouselNext.displayName = 'CarouselNext';

export default CarouselNext;
