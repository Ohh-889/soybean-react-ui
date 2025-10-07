import type { MDXComponents } from 'mdx/types';
import { Code, InstallDependencies } from 'skyroc-next-docs-plugin';

import { ComponentPreview } from '@/components/component-preview';
import { H1, H2, H3, H4, H5, H6 } from '@/m-components/heading';

import { Pre } from './m-components/pre';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  console.log('components', components);

  return {
    ...components,
    code: Code,
    ComponentPreview,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    InstallDependencies,
    pre: Pre
  };
}
