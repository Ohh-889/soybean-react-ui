import { CommandList as _CommandList } from 'cmdk';

import { cn } from '@/lib/utils';

import { commandVariants } from './command-variants';
import type { CommandListProps } from './types';

const CommandList = (props: CommandListProps) => {
  const { className, size, ...rest } = props;

  const { list } = commandVariants({ size });

  const mergedClass = cn(list(), className);
  return (
    <_CommandList
      {...rest}
      className={mergedClass}
      data-slot="command-list"
    />
  );
};

export default CommandList;
