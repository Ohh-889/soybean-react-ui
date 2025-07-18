'use client';

import { ChevronRight } from 'lucide-react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../button';

import { carouselVariants } from './carousel-variants';
import { useCarousel } from './context';
import type { CarouselNextProps } from './types';

const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>((props, ref) => {
  const { children, className, disabled, shape = 'circle', size, variant = 'pure', ...rest } = props;

  const { canScrollNext, orientation, scrollNext } = useCarousel();

  const { next } = carouselVariants({ orientation, size });

  const nextClassName = cn(next(), className);

  return (
    <Button
      className={nextClassName}
      disabled={!canScrollNext || disabled}
      ref={ref}
      shape={shape}
      size={size}
      variant={variant}
      onClick={scrollNext}
      {...rest}
    >
      {children || <ChevronRight />}
    </Button>
  );
});

CarouselNext.displayName = 'CarouselNext';

export default CarouselNext;
