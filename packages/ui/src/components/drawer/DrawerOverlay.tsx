import { Overlay as _Overlay } from 'vaul';

import { DialogOverlay } from '../dialog';

import type { DrawerOverlayProps } from './types';

const DrawerOverlay = (props: DrawerOverlayProps) => {
  return (
    <DialogOverlay
      component={_Overlay}
      {...props}
    />
  );
};

export default DrawerOverlay;
