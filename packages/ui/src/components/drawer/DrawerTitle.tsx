import { Drawer } from 'vaul';

import { DialogTitle } from '../dialog';

import type { DrawerTitleProps } from './types';

const DrawerTitle = (props: DrawerTitleProps) => {
  return (
    <DialogTitle
      component={Drawer.Title}
      {...props}
    />
  );
};

export default DrawerTitle;
