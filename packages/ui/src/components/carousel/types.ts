import type { CarouselSlots, ClassValue } from '@soybean-react-ui/variants';
import type useEmblaCarousel from 'embla-carousel-react';
import { type UseEmblaCarouselType } from 'embla-carousel-react';

import type { BaseComponentProps } from '../../types/other';
import type { ButtonProps } from '../button';

export type CarouselApi = UseEmblaCarouselType[1];
export type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = UseCarouselParameters[0];
export type CarouselPlugin = UseCarouselParameters[1];

export type CarouselRootType = {
  opts?: CarouselOptions;
  orientation?: 'horizontal' | 'vertical';
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
};

export type CarouselContextProps = {
  api: ReturnType<typeof useEmblaCarousel>[1];
  canScrollNext: boolean;
  canScrollPrev: boolean;
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
} & CarouselRootType;

export type CarouselUi = Partial<Record<CarouselSlots, ClassValue>>;

export type CarouselContentProps = BaseComponentProps<'div'> & {
  classNames?: Pick<CarouselUi, 'content' | 'contentWrapper'>;
};

export type CarouselItemProps = BaseComponentProps<'div'>;

export type CarouselNextProps = ButtonProps;

export type CarouselPreviousProps = ButtonProps;

export type CarouselRootProps = BaseComponentProps<'div'> & CarouselRootType;

export type CarouselPropsWithoutChildren = Omit<CarouselRootProps, 'children'> & {
  classNames?: CarouselUi;
  counts?: number;
  nextProps?: Omit<ButtonProps, 'class'>;
  previousProps?: Omit<ButtonProps, 'class'>;
};

export interface CarouselWithSlotChildren extends CarouselPropsWithoutChildren {
  children: (index: number) => React.ReactNode;
}

export interface CarouselWithChildrenArray extends CarouselPropsWithoutChildren {
  children: React.ReactNode[];
}

export type CarouselProps = CarouselWithSlotChildren | CarouselWithChildrenArray;
