import plugin from 'tailwindcss/plugin';

import { generateCSSVars } from './generate';
import { presetSkyrocUI } from './presets';
import themes from './theme.json';
import { skyrocUITheme } from './themePresets';
import type { SoybeanUIPluginOptions, ThemeColorKey, ThemeConfig, ThemeConfigColor, ThemeOptions } from './types';

export const builtinColors = themes.map(theme => theme.name) as ThemeConfigColor[];

export const builtinColorMap = themes.reduce(
  (acc, theme) => {
    acc[theme.name as ThemeConfigColor] = theme.cssVars.light.primary;
    return acc;
  },
  {} as Record<ThemeConfigColor, string>
);

export const builtinRadiuses = [0, 0.3, 0.5, 0.75, 1] as const;

/**
 * The UnoCSS preset for Soybean UI.
 *
 * @param options - The options for the preset.
 * @param globals - Whether to generate global variables, like *.border-color, body.color, body.background.
 */
export const soybeanUIPlugin = plugin.withOptions(
  (options: SoybeanUIPluginOptions = {}) =>
    ({ addBase, addUtilities }) => {
      addUtilities(presetSkyrocUI());

      addBase(skyrocUITheme(options));
    },
  () => ({
    theme: {
      extend: {
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
          xl: 'calc(var(--radius) + 4px)'
        },
        colors: {
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))'
          },
          background: 'hsl(var(--background))',
          border: 'hsl(var(--border))',
          carbon: {
            50: 'hsl(var(--carbon-50))',
            100: 'hsl(var(--carbon-100))',
            200: 'hsl(var(--carbon-200))',
            300: 'hsl(var(--carbon-300))',
            400: 'hsl(var(--carbon-400))',
            500: 'hsl(var(--carbon-500))',
            600: 'hsl(var(--carbon-600))',
            700: 'hsl(var(--carbon-700))',
            800: 'hsl(var(--carbon-800))',
            900: 'hsl(var(--carbon-900))',
            950: 'hsl(var(--carbon-950))',
            DEFAULT: 'hsl(var(--carbon))',
            foreground: 'hsl(var(--carbon-foreground))'
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))'
          },
          destructive: {
            50: 'hsl(var(--destructive-50))',
            100: 'hsl(var(--destructive-100))',
            200: 'hsl(var(--destructive-200))',
            300: 'hsl(var(--destructive-300))',
            400: 'hsl(var(--destructive-400))',
            500: 'hsl(var(--destructive-500))',
            600: 'hsl(var(--destructive-600))',
            700: 'hsl(var(--destructive-700))',
            800: 'hsl(var(--destructive-800))',
            900: 'hsl(var(--destructive-900))',
            950: 'hsl(var(--destructive-950))',
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))'
          },
          foreground: 'hsl(var(--foreground))',
          info: {
            50: 'hsl(var(--info-50))',
            100: 'hsl(var(--info-100))',
            200: 'hsl(var(--info-200))',
            300: 'hsl(var(--info-300))',
            400: 'hsl(var(--info-400))',
            500: 'hsl(var(--info-500))',
            600: 'hsl(var(--info-600))',
            700: 'hsl(var(--info-700))',
            800: 'hsl(var(--info-800))',
            900: 'hsl(var(--info-900))',
            950: 'hsl(var(--info-950))',
            DEFAULT: 'hsl(var(--info))',
            foreground: 'hsl(var(--info-foreground))'
          },
          input: 'hsl(var(--input))',
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))'
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))'
          },
          // 示例部分（你也可以写一个生成器函数自动输出完整变量映射）
          primary: {
            50: 'hsl(var(--primary-50))',
            100: 'hsl(var(--primary-100))',
            200: 'hsl(var(--primary-200))',
            300: 'hsl(var(--primary-300))',
            400: 'hsl(var(--primary-400))',
            500: 'hsl(var(--primary-500))',
            600: 'hsl(var(--primary-600))',
            700: 'hsl(var(--primary-700))',
            800: 'hsl(var(--primary-800))',
            900: 'hsl(var(--primary-900))',
            950: 'hsl(var(--primary-950))',
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))'
          },
          ring: 'hsl(var(--ring))',
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))'
          },
          'sidebar-accent': 'hsl(var(--sidebar-accent))',
          'sidebar-accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          'sidebar-background': 'hsl(var(--sidebar-background))',
          'sidebar-border': 'hsl(var(--sidebar-border))',
          'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
          'sidebar-primary': 'hsl(var(--sidebar-primary))',
          'sidebar-primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          'sidebar-ring': 'hsl(var(--sidebar-ring))',
          success: {
            50: 'hsl(var(--success-50))',
            100: 'hsl(var(--success-100))',
            200: 'hsl(var(--success-200))',
            300: 'hsl(var(--success-300))',
            400: 'hsl(var(--success-400))',
            500: 'hsl(var(--success-500))',
            600: 'hsl(var(--success-600))',
            700: 'hsl(var(--success-700))',
            800: 'hsl(var(--success-800))',
            900: 'hsl(var(--success-900))',
            950: 'hsl(var(--success-950))',
            DEFAULT: 'hsl(var(--success))',
            foreground: 'hsl(var(--success-foreground))'
          },
          warning: {
            50: 'hsl(var(--warning-50))',
            100: 'hsl(var(--warning-100))',
            200: 'hsl(var(--warning-200))',
            300: 'hsl(var(--warning-300))',
            400: 'hsl(var(--warning-400))',
            500: 'hsl(var(--warning-500))',
            600: 'hsl(var(--warning-600))',
            700: 'hsl(var(--warning-700))',
            800: 'hsl(var(--warning-800))',
            900: 'hsl(var(--warning-900))',
            950: 'hsl(var(--warning-950))',
            DEFAULT: 'hsl(var(--warning))',
            foreground: 'hsl(var(--warning-foreground))'
          }
        },
        fontSize: {
          '2xs': ['0.625rem', '0.75rem'],
          '3xs': ['0.5rem', '0.625rem'],
          '4xs': ['0.375rem', '0.5rem']
        }
      }
    }
  })
);

export { generateCSSVars, presetSkyrocUI, skyrocUITheme };

export type { ThemeColorKey, ThemeConfig, ThemeConfigColor, ThemeOptions };

export default soybeanUIPlugin;
