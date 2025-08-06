'use client';

import { ChevronLeft } from 'lucide-react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { ButtonIcon } from '../button';

import { carouselVariants } from './carousel-variants';
import { useCarousel } from './context';
import type { CarouselNextProps } from './types';

const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>((props, ref) => {
  const { children, className, disabled, shape = 'circle', size, variant = 'pure', ...rest } = props;

  const { canScrollPrev, orientation, scrollPrev } = useCarousel();

  const { previous } = carouselVariants({ orientation, size });

  const previousClassName = cn(previous(), className);

  return (
    <ButtonIcon
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
    </ButtonIcon>
  );
});

CarouselNext.displayName = 'CarouselNext';

export default CarouselNext;
