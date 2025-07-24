import { CommandSeparator as _CommandSeparator } from 'cmdk';

import { cn } from '@/lib/utils';

import { commandVariants } from './command-variants';
import type { CommandSeparatorProps } from './types';

const CommandSeparator = (props: CommandSeparatorProps) => {
  const { className, size, ...rest } = props;

  const { separator } = commandVariants({ size });

  const mergedClass = cn(separator(), className);
  return (
    <_CommandSeparator
      {...rest}
      className={mergedClass}
      data-slot="command-separator"
    />
  );
};

export default CommandSeparator;
