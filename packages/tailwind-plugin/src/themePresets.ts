import { generateCSSVars, generateGlobalStyles } from './generate';
import type { PluginOptions, SoybeanUIPluginOptions } from './types';

export function skyrocUITheme(addBase: PluginOptions['addBase'], options: SoybeanUIPluginOptions) {
  const { globals = true, theme = {} } = options;

  const cssVars = generateCSSVars(theme);

  const baseStyles = globals ? generateGlobalStyles() : '';

  addBase({
    ...cssVars,
    ...baseStyles,
    '@keyframes shadcn-collapsible-down': {
      from: { height: '0' },
      to: { height: 'var(--radix-collapsible-content-height)' }
    },
    '@keyframes shadcn-collapsible-up': {
      from: { height: 'var(--radix-collapsible-content-height)' },
      to: { height: '0' }
    },
    '@keyframes shadcn-down': {
      from: { height: '0' },
      to: { height: 'var(--radix-accordion-content-height)' }
    },
    '@keyframes shadcn-up': {
      from: { height: 'var(--radix-accordion-content-height)' },
      to: { height: '0' }
    },
    'html.size-2xl': {
      fontSize: '24px'
    },
    'html.size-lg': {
      fontSize: '18px'
    },
    'html.size-md': {
      fontSize: '16px'
    },
    'html.size-sm': {
      fontSize: '14px'
    },
    'html.size-xl': {
      fontSize: '20px'
    },
    'html.size-xs': {
      fontSize: '12px'
    }
  });
}
