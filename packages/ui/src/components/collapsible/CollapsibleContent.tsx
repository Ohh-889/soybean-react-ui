import { Content } from '@radix-ui/react-collapsible';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { collapsibleVariants } from './collapsible-variants';
import type { CollapsibleContentProps } from './types';

const CollapsibleContent = forwardRef<ComponentRef<typeof Content>, CollapsibleContentProps>((props, ref) => {
  const { className, ...rest } = props;

  const { content } = collapsibleVariants();

  const mergedCls = cn(content(), className);

  return (
    <Content
      className={mergedCls}
      ref={ref}
      {...rest}
    />
  );
});

CollapsibleContent.displayName = 'CollapsibleContent';

export default CollapsibleContent;
