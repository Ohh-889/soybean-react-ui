import { Drawer } from 'vaul';

import { DialogDescription } from '../dialog';

import type { DrawerDescriptionProps } from './types';

const DrawerDescription = (props: DrawerDescriptionProps) => {
  return (
    <DialogDescription
      component={Drawer.Description}
      {...props}
    />
  );
};

export default DrawerDescription;
