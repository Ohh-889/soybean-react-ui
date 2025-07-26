import { Drawer } from 'vaul';

import { DialogClose } from '../dialog';

import type { DrawerCloseProps } from './types';

const DrawerClose = (props: DrawerCloseProps) => {
  return (
    <DialogClose
      component={Drawer.Close}
      {...props}
    />
  );
};

export default DrawerClose;
