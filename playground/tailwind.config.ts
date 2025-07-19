import { soybeanUIPlugin } from '@soybean-react-ui/tailwind-plugin';
import type { Config } from 'tailwindcss';

import baseConfig from '../tailwind.config';

const config: Config = {
  ...(baseConfig as Config),
  plugins: [soybeanUIPlugin()]
};

export default config;
