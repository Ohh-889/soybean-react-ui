import { soybeanUIPlugin } from 'skyroc-tailwind-plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  plugins: [soybeanUIPlugin()]
};

export default config;
