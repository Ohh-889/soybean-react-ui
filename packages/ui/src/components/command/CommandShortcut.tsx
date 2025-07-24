import { cn } from '@/lib/utils';

import KeyboardKey from '../keyboard-key/KeyboardKey';
import type { KeyboardKeyValue } from '../keyboard-key/types';

import { commandVariants } from './command-variants';
import type { CommandShortcutProps } from './types';

const CommandShortcut = (props: CommandShortcutProps) => {
  const { children, className, size, value, ...rest } = props;

  const { shortcut } = commandVariants({ size });

  const mergedClass = cn(shortcut(), className);

  return (
    <div
      {...rest}
      className={mergedClass}
      data-slot="command-shortcut"
    >
      {children || (
        <KeyboardKey
          size={size}
          value={value as KeyboardKeyValue}
        />
      )}
    </div>
  );
};

export default CommandShortcut;
