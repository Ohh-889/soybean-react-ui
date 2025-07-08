import type { CardSlots, ClassValue, ClassValueProp, ThemeSize } from '@soybean-react-ui/variants';
import type { ReactNode } from 'react';

export interface CardRootProps
  extends ClassValueProp,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  size?: ThemeSize;
  split?: boolean;
}

export interface CardHeaderProps
  extends ClassValueProp,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  size?: ThemeSize;
}

export interface CardTitleRootProps
  extends ClassValueProp,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  leading?: React.ReactNode;
  size?: ThemeSize;
  trailing?: React.ReactNode;
}

export interface CardTitleProps
  extends ClassValueProp,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  size?: ThemeSize;
}

export interface CardFooterProps
  extends ClassValueProp,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  size?: ThemeSize;
}

export interface CardContentProps
  extends ClassValueProp,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  /**
   * If true, the content will be flex-grow and overflow-hidden
   *
   * @default false
   */
  flexHeight?: boolean;
  size?: ThemeSize;
}

export type CardUi = Partial<Record<CardSlots, ClassValue>>;

export interface CardProps extends CardRootProps {
  classNames?: CardUi;
  extra?: ReactNode;
  /**
   * If true, the content will be flex-grow and overflow-hidden
   *
   * @default false
   */
  flexHeight?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
  title?: ReactNode;
  titleLeading?: ReactNode;
  titleRoot?: ReactNode;
  titleTrailing?: ReactNode;
}
