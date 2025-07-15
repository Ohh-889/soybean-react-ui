import { Slot } from '@radix-ui/react-slot';
import { alertVariants, cn } from '@soybean-react-ui/variants';
import { forwardRef } from 'react';

import type { AlertProps } from './types';

import AlertDescription from './AlertDescription';
import AlertRoot from './AlertRoot';
import AlertTitle from './AlertTitle';
import AlertWrapper from './AlertWrapper';

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    children,
    className,
    classNames,
    color,
    description,
    icon,
    leading,
    size,
    title,
    trailing,
    variant,
    ...rest
  } = props;

  const { icon: iconCls } = alertVariants({ color, size, variant });

  const mergedCls = cn(iconCls(), classNames?.icon);
  return (
    <AlertRoot
      className={className || classNames?.root}
      color={color}
      size={size}
      variant={variant}
      {...rest}
      ref={ref}
    >
      {leading}
      <Slot className={mergedCls}>{icon}</Slot>

      <AlertWrapper
        className={classNames?.wrapper}
        size={size}
      >
        {title && (
          <AlertTitle
            className={classNames?.title}
            size={size}
          >
            {title}
          </AlertTitle>
        )}

        {description && (
          <AlertDescription
            className={classNames?.description}
            size={size}
          >
            {description}
          </AlertDescription>
        )}

        {children}
      </AlertWrapper>

      {trailing}
    </AlertRoot>
  );
});

Alert.displayName = 'Alert';

export default Alert;
