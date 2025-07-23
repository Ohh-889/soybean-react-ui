import { Separator } from '@radix-ui/react-dropdown-menu';

import MenuSeparator from '../menu/MenuSeparator';

import type { DropdownMenuSeparatorProps } from './types';

const DropdownMenuSeparator = (props: DropdownMenuSeparatorProps) => {
  return (
    <MenuSeparator
      component={Separator}
      {...props}
    />
  );
};

export default DropdownMenuSeparator;
