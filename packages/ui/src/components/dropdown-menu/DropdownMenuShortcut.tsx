import { cn } from '@/lib';

import type { KeyboardKeyValue } from '../keyboard-key';
import { KeyboardKey } from '../keyboard-key';

import { menuVariants } from './dropdown-menu-variants';
import type { DropdownMenuShortcutProps } from './types';

const DropdownMenuShortcut = (props: DropdownMenuShortcutProps) => {
  const { className, size, value, ...rest } = props;

  const { shortcut } = menuVariants({ size });

  const mergedCls = cn(shortcut(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
    >
      <KeyboardKey
        size={size}
        value={value as KeyboardKeyValue}
      />
    </div>
  );
};

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export default DropdownMenuShortcut;
