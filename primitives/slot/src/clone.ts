import type { ReactNode } from 'react';
import { Children, Fragment, cloneElement, forwardRef, isValidElement } from 'react';
import { composeRefs } from 'soybean-react-ui/compose-refs';

import type { AnyProps } from './shared';
import { getElementRef, mergeProps } from './shared';

interface SlotCloneProps {
  children: ReactNode;
}

/* @__NO_SIDE_EFFECTS__ */ export function createSlotClone(ownerName: string) {
  const SlotClone = forwardRef<any, SlotCloneProps>((props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const mergedProps = mergeProps(slotProps, children.props as AnyProps);
      // do not pass ref to Fragment for React 19 compatibility
      if (children.type !== Fragment) {
        mergedProps.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return cloneElement(children, mergedProps);
    }

    return Children.count(children) > 1 ? Children.only(null) : null;
  });

  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
