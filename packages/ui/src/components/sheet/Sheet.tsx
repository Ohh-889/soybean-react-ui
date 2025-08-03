'use client';

import { Dialog } from '../dialog';

import SheetContent from './SheetContent';
import type { SheetProps } from './types';

const Sheet = (props: SheetProps) => {
  const { children, ...rest } = props;

  return (
    <Dialog
      contentComponent={SheetContent}
      {...rest}
    >
      <div className="flex-grow overflow-auto">{children}</div>
    </Dialog>
  );
};

export default Sheet;
