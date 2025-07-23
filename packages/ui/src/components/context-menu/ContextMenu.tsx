import { Root, Trigger } from '@radix-ui/react-context-menu';

import ContextMenuContent from './ContextMenuContent';
import ContextMenuOption from './ContextMenuOption';
import type { ContextMenuProps } from './types';

const ContextMenu = (props: ContextMenuProps) => {
  const { children, classNames, contentProps, dir, items, modal, onOpenChange, size } = props;

  return (
    <Root
      dir={dir}
      modal={modal}
      onOpenChange={onOpenChange}
    >
      <Trigger asChild>{children}</Trigger>

      <ContextMenuContent {...contentProps}>
        {items.map((item, index) => {
          return (
            <ContextMenuOption
              classNames={classNames}
              item={item}
              key={String(index)}
              size={size}
            />
          );
        })}
      </ContextMenuContent>
    </Root>
  );
};

export default ContextMenu;
