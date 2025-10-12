const config = {
  githubUrl: 'https://github.com/Ohh-889/skyroc-ui',
  // eslint-disable-next-line n/prefer-global/process
  isDev: process.env.NODE_ENV === 'development',
  META_THEME_COLORS: {
    dark: '#030712',
    light: '#fafafa'
  }
} as const;

export default config;
