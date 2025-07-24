import { CommandGroup as _CommandGroup } from 'cmdk';

import { cn } from '@/lib/utils';

import { commandVariants } from './command-variants';
import type { CommandGroupProps } from './types';

const CommandGroup = (props: CommandGroupProps) => {
  const { children, className, classNames, heading, ...rest } = props;

  const { group, groupLabel } = commandVariants();

  const mergedClass = cn(group(), className || classNames?.group);

  const mergedLabelClass = cn(groupLabel(), className || classNames?.groupLabel);

  return (
    <_CommandGroup
      {...rest}
      className={mergedClass}
      data-slot="command-group"
    >
      {heading && <div className={mergedLabelClass}>{heading}</div>}

      {children}
    </_CommandGroup>
  );
};

export default CommandGroup;
