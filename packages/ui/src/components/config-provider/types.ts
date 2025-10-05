import type { ThemeOptions } from '@skyroc/tailwind-plugin';

import type { ThemeSize } from '@/types/other';

import type { AccordionProps } from '../accordion/types';
import type { AlertProps } from '../alert';
import type { IconProps } from '../icon';

export interface ConfigProviderProps extends ConfigProps {
  children: React.ReactNode;
}

export interface ConfigProps extends ComponentConfig {
  direction?: 'ltr' | 'rtl';
  size?: ThemeSize;
  theme?: ThemeOptions;
}

export type ComponentConfig = {
  accordion?: AccordionConfig;
  alert?: AlertConfig;
  icon?: IconConfig;
};

export type AccordionConfig = Pick<AccordionProps, 'className' | 'classNames' | 'dir' | 'size' | 'triggerIcon'>;

export type AlertConfig = Pick<
  AlertProps,
  'className' | 'classNames' | 'color' | 'icon' | 'leading' | 'size' | 'trailing' | 'variant'
>;

export type IconConfig = Pick<IconProps, 'className' | 'color' | 'height' | 'inline' | 'width'>;
