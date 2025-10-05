import { type ClassValue } from 'clsx';
import type { ReactNode } from 'react';

export type ThemeColor = 'accent' | 'carbon' | 'destructive' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';

export type ThemeSize = '2xl' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';

export type ThemeOrientation = 'horizontal' | 'vertical';

export type ThemeAlign = 'center' | 'end' | 'start';

export type ThemeSide = 'bottom' | 'left' | 'right' | 'top';

export type ClassValueProp = {
  /** class name */
  className?: ClassValue;
};

export type AsTag =
  | 'a'
  | 'button'
  | 'div'
  | 'form'
  | 'h2'
  | 'h3'
  | 'img'
  | 'input'
  | 'label'
  | 'li'
  | 'nav'
  | 'ol'
  | 'p'
  | 'span'
  | 'svg'
  | 'ul'
  | 'template'
  | ({} & string);

export interface PrimitiveProps {
  /**
   * The element or component this component should render as. Can be overwrite by `asChild`
   *
   * @defaultValue 'div'
   */
  as?: AsTag | ReactNode;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read our [Composition](https://www.soybean-ui.com/docs/guides/composition) guide for more details.
   */
  asChild?: boolean;
}

export type BaseNodeProps<T> = Omit<T, 'className'> & {
  className?: ClassValue;
  size?: ThemeSize;
};

export type BaseProps<T> = T & {
  className?: ClassValue;
  size?: ThemeSize;
};

export type PropsSlot = {
  leading?: ReactNode;
  trailing?: ReactNode;
};

export type BaseComponentProps<T extends keyof React.JSX.IntrinsicElements> = BaseNodeProps<
  React.ComponentPropsWithRef<T>
>;

export type AcceptableValue = string | number | bigint | Record<string, any> | null;

export type { ClassValue };
