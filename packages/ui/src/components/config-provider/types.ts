import type { ThemeOptions } from '@soybean-react-ui/tailwind-plugin';

import type { ThemeSize } from '@/types/other';

import type { AccordionProps } from '../accordion/types';

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
};

export type AccordionConfig = Pick<AccordionProps, 'className' | 'classNames' | 'dir' | 'size' | 'triggerIcon'>;
