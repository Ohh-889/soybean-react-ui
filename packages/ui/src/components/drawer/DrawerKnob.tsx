import { cn } from '@/lib/utils';

import { drawerVariants } from './drawer-variants';
import type { DrawerKnobProps } from './types';

const DrawerKnob = (props: DrawerKnobProps) => {
  const { className, size, ...rest } = props;

  const { knob } = drawerVariants({ size });

  const mergedCls = cn(knob(), className);

  return (
    <div
      className={mergedCls}
      {...rest}
    />
  );
};

export default DrawerKnob;
