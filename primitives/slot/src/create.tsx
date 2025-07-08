import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import React, { Children, cloneElement, forwardRef, isValidElement } from 'react';

import { createSlotClone } from './clone';

interface SlottableProps {
  children: React.ReactNode;
}

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

interface SlottableComponent extends React.FC<SlottableProps> {
  __soybeanId: symbol;
}

const SLOTTABLE_IDENTIFIER = Symbol('soybean.slottable');

// eslint-disable-next-line react-refresh/only-export-components
/* @__NO_SIDE_EFFECTS__ */ export function createSlottable(ownerName: string) {
  // eslint-disable-next-line react/prop-types
  const Slottable: SlottableComponent = ({ children }) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  };
  Slottable.displayName = `${ownerName}.Slottable`;
  Slottable.__soybeanId = SLOTTABLE_IDENTIFIER;
  return Slottable;
}

export const Slottable = createSlottable('Slottable');

// eslint-disable-next-line react-refresh/only-export-components
export function isSlottable(child: React.ReactNode): child is ReactElement<SlottableProps, typeof Slottable> {
  return (
    isValidElement(child) &&
    typeof child.type === 'function' &&
    '__soybeanId' in child.type &&
    child.type.__soybeanId === SLOTTABLE_IDENTIFIER
  );
}

// eslint-disable-next-line react-refresh/only-export-components
/* @__NO_SIDE_EFFECTS__ */ export function createSlot(ownerName: string) {
  const SlotClone = createSlotClone(ownerName);

  const Slot = forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
    const { children, ...slotProps } = props;

    const childrenArray = Children.toArray(children);

    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      // the new element to render is the one passed as a child of `Slottable`
      const newElement = slottable.props.children as ReactElement;

      const newChildren = childrenArray.map(child => {
        if (child === slottable) {
          // because the new element will be the one rendered, we are only interested
          // in grabbing its children (`newElement.props.children`)
          if (Children.count(newElement) > 1) return Children.only(null);
          return isValidElement(newElement) ? (newElement.props as { children: ReactNode }).children : null;
        }
        return child;
      });

      return (
        <SlotClone
          {...slotProps}
          ref={forwardedRef}
        >
          {isValidElement(newElement) ? cloneElement(newElement, undefined, newChildren) : null}
        </SlotClone>
      );
    }

    return (
      <SlotClone
        {...slotProps}
        ref={forwardedRef}
      >
        {children}
      </SlotClone>
    );
  });

  Slot.displayName = `${ownerName}.Slot`;
  return Slot;
}

export const Slot = createSlot('Slot');
