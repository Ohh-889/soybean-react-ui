import { buttonGroupVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { ButtonGroupProps } from '../type';

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  const { children, className, orientation, ...rest } = props;

  const mergedCls = cn(buttonGroupVariants({ orientation }), className);

  return (
    <div
      className={mergedCls}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
