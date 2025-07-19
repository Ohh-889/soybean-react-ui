import { soybeanUIPlugin } from '@soybean-react-ui/tailwind-plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  plugins: [soybeanUIPlugin()]
};

export default config;
