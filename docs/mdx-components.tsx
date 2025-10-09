import type { MDXComponents } from 'mdx/types';
import { Code, ComponentPreview, Demo, InstallDependencies, LiveDemo } from 'skyroc-next-docs-plugin';

import { H1, H2, H3, H4, H5, H6 } from '@/m-components/heading';

import { Pre } from './m-components/pre';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    code: Code,
    ComponentPreview,
    Demo, // 使用增强版 Demo（支持 registry）
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    InstallDependencies,
    LiveDemo,
    pre: Pre
  };
}
