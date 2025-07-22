import { Root, Trigger } from '@radix-ui/react-dropdown-menu';

import DropdownMenuOption from './DropdownMenuOption';
import DropdownMenuPortalContent from './DropdownMenuPortalContent';
import type { DropdownMenuProps } from './types';

const DropdownMenu = (props: DropdownMenuProps) => {
  const { children, classNames, contentProps, defaultOpen, dir, items, modal, onOpenChange, open, size } = props;

  return (
    <Root
      defaultOpen={defaultOpen}
      dir={dir}
      modal={modal}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger asChild>{children}</Trigger>

      <DropdownMenuPortalContent {...contentProps}>
        {items.map((item, index) => {
          return (
            <DropdownMenuOption
              classNames={classNames}
              item={item}
              key={String(index)}
              size={size}
            />
          );
        })}
      </DropdownMenuPortalContent>
    </Root>
  );
};

export default DropdownMenu;
