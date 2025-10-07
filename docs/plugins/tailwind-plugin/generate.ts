import { colord, generateColorPalette } from '@skyroc/color';
import { mergeDeep } from '@unocss/core';

import themes from './theme.json';
import type {
  ColorOptions,
  FeedbackColorOfThemeCssVarKey,
  FeedbackColorOfThemeCssVars,
  FeedbackColorOfThemeCssVarsVariant,
  SidebarColorOfThemeCssVarKey,
  SidebarColorOfThemeCssVarsVariant,
  ThemeCSSVarKey,
  ThemeCSSVars,
  ThemeCSSVarsVariant,
  ThemeConfig,
  ThemeOptions
} from './types';

const builtinThemes = themes as ThemeConfig[];

type CSSVarKey = ThemeCSSVarKey | FeedbackColorOfThemeCssVarKey | SidebarColorOfThemeCssVarKey;

const themeCSSVarKeys: CSSVarKey[] = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'destructive',
  'destructive-foreground',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'info',
  'info-foreground',
  'secondary',
  'secondary-foreground',
  'carbon',
  'carbon-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'border',
  'input',
  'ring',
  'sidebar-background',
  'sidebar-foreground',
  'sidebar-border',
  'sidebar-ring',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground'
];

const themeColorKeys: CSSVarKey[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon'];

function getRadiusCSSVars(radius: number) {
  return `--radius: ${radius}rem;`;
}

function getRadiusCSSVarsStyles(radius: number) {
  const radiusCSS = getRadiusCSSVars(radius);

  return radiusCSS;
}

export function generateGlobalStyles() {
  return {
    '*': {
      borderColor: 'hsl(var(--border))'
    },
    '.lucide': {
      height: '1.25em',
      width: '1.25em'
    },
    body: {
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))'
    }
  };
}

function getBuiltInTheme(name: string): ThemeCSSVarsVariant {
  const theme = builtinThemes.find(t => t.name === name);

  if (!theme) {
    throw new Error(`Unknown color: ${name}`);
  }

  return {
    name,
    ...theme.cssVars
  };
}

function getColorTheme(color: ColorOptions): ThemeCSSVarsVariant {
  let light: ThemeCSSVars;
  let dark: ThemeCSSVars;
  let name: string;

  if (typeof color === 'string') {
    name = color;
    ({ dark, light } = getBuiltInTheme(color));
  } else if ('base' in color) {
    name = color.base;
    ({ dark, light } = mergeDeep(getBuiltInTheme(color.base), color));
  } else {
    name = color.name;
    ({ dark, light } = color);
  }
  return { dark, light, name };
}

function createBuiltinFeedbackColorTheme() {
  const feedbackColor: FeedbackColorOfThemeCssVarsVariant = {
    dark: {
      carbon: '220 14.3% 95.9%',
      'carbon-foreground': '220.9 39.3% 11%',
      info: '215 100% 54%',
      'info-foreground': '0 0% 100%',
      success: '140 79% 45%',
      'success-foreground': '0 0% 100%',
      warning: '37 91% 55%',
      'warning-foreground': '0 0% 100%'
    },
    light: {
      carbon: '240 4% 16%',
      'carbon-foreground': '0 0% 98%',
      info: '215 100% 54%',
      'info-foreground': '0 0% 100%',
      success: '140 79% 45%',
      'success-foreground': '0 0% 100%',
      warning: '37 91% 55%',
      'warning-foreground': '0 0% 100%'
    }
  };

  return feedbackColor;
}

function getColorCSSVars(color: FeedbackColorOfThemeCssVars): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [item, value] of Object.entries(color)) {
    const key = item as CSSVarKey;

    if (!themeCSSVarKeys.includes(key)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    result[`--${key}`] = value; // 原始变量，如 "--primary": "220 90% 55%"

    if (themeColorKeys.includes(key)) {
      const hsl = `hsl(${value.split(' ').join(', ')})`;

      const colorPalette = generateColorPalette(hsl); // { 100: "#f0f", 200: "#e0e", ... }

      for (const [num, hex] of Object.entries(colorPalette)) {
        const { h, l, s } = colord(hex).toHsl();
        result[`--${key}-${num}`] = `${h} ${s}% ${l}%`; // "--primary-100": "220 90% 95%"
      }
    }
  }

  return result;
}

function createBuiltinSidebarColorTheme() {
  const sidebarColor: SidebarColorOfThemeCssVarsVariant = {
    dark: {
      'sidebar-accent': '240 3.7% 15.9%',
      'sidebar-accent-foreground': '240 4.8% 95.9%',
      'sidebar-background': '240 5.9% 10%',
      'sidebar-border': '240 3.7% 15.9%',
      'sidebar-foreground': '240 4.8% 95.9%',
      'sidebar-primary': '236.9 100% 69.61%',
      'sidebar-primary-foreground': '0 0% 100%',
      'sidebar-ring': '217.2 91.2% 59.8%'
    },
    light: {
      'sidebar-accent': '240 4.8% 95.9%',
      'sidebar-accent-foreground': '240 5.9% 10%',
      'sidebar-background': '0 0% 98%',
      'sidebar-border': '220 13% 91%',
      'sidebar-foreground': '240 5.3% 26.1%',
      'sidebar-primary': '236.9 100% 69.61%',
      'sidebar-primary-foreground': '0 0% 98%',
      'sidebar-ring': '217.2 91.2% 59.8%'
    }
  };

  return sidebarColor;
}

export function generateCSSVars(theme: ThemeOptions, onlyOne = true): object {
  const {
    color = 'default',
    darkSelector = '.dark',
    feedbackColor = createBuiltinFeedbackColorTheme(),
    radius = 0.5,
    sidebar = createBuiltinSidebarColorTheme()
  } = theme;

  if (!color) {
    if (radius) {
      return {
        root: getRadiusCSSVarsStyles(radius)
      };
    }
  } else {
    const { dark, light, name } = getColorTheme(color);

    const themeName = !onlyOne && name;

    const addThemeName = themeName && themeName !== 'default';

    const themeSelector = addThemeName ? `.theme-${themeName}` : ':root';

    const darkThemeSelector = addThemeName ? `.theme-${themeName}${darkSelector}` : darkSelector;

    const darkThemeCSSVars = getColorCSSVars({ ...feedbackColor.dark, ...dark, ...sidebar.dark });

    const lightThemeCSSVars = getColorCSSVars({ ...feedbackColor.light, ...light, ...sidebar.light });

    return {
      // eslint-disable-next-line sort/object-properties
      [themeSelector]: {
        ...lightThemeCSSVars,
        '--radius': `${radius}rem`
      },
      [darkThemeSelector]: {
        ...darkThemeCSSVars
      }
    };
  }

  return {};
}
