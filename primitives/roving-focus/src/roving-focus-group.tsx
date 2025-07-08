import * as React from 'react';

import { useComposedRefs } from 'soybean-react-ui/compose-refs';


import { useDirection } from 'soybean-react-ui/direction';

import { Primitive, composeEventHandlers } from 'soybean-react-ui/primitive';
import { useCallbackRef } from 'soybean-react-ui/use-callback-ref';
import { useControllableState } from 'soybean-react-ui/use-controllable-state';
import { Collection, GROUP_NAME, RovingFocusProvider, useCollection } from './context';
import { RovingFocusGroupElement, RovingFocusGroupImplElement, RovingFocusGroupImplProps, RovingFocusGroupProps, ScopedProps } from './types';
import { focusFirst } from './shared';

const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus';

const EVENT_OPTIONS = { bubbles: false, cancelable: true };


const RovingFocusGroupImpl = React.forwardRef<RovingFocusGroupImplElement, RovingFocusGroupImplProps>(
  (props: ScopedProps<RovingFocusGroupImplProps>, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      dir,
      loop = false,
      onCurrentTabStopIdChange,
      onEntryFocus,
      orientation,
      preventScrollOnEntryFocus = false,
      ...groupProps
    } = props;
    const ref = React.useRef<RovingFocusGroupImplElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const direction = useDirection(dir);
    const [currentTabStopId, setCurrentTabStopId] = useControllableState({
      caller: GROUP_NAME,
      defaultProp: defaultCurrentTabStopId ?? null,
      onChange: onCurrentTabStopIdChange,
      prop: currentTabStopIdProp
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
    const handleEntryFocus = useCallbackRef(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = React.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = React.useState(0);

    React.useEffect(() => {
      const node = ref.current;
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus);

        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
      }

      return () => {};
    }, [handleEntryFocus]);

    return (
      <RovingFocusProvider
        currentTabStopId={currentTabStopId}
        dir={direction}
        loop={loop}
        orientation={orientation}
        scope={__scopeRovingFocusGroup}
        onFocusableItemAdd={React.useCallback(() => setFocusableItemsCount(prevCount => prevCount + 1), [])}
        onFocusableItemRemove={React.useCallback(() => setFocusableItemsCount(prevCount => prevCount - 1), [])}
        onItemFocus={React.useCallback(tabStopId => setCurrentTabStopId(tabStopId), [setCurrentTabStopId])}
        onItemShiftTab={React.useCallback(() => setIsTabbingBackOut(true), [])}
      >
        <Primitive.div
          data-orientation={orientation}
          tabIndex={isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0}
          {...groupProps}
          ref={composedRefs as React.Ref<HTMLDivElement>}
          style={{ outline: 'none', ...props.style }}
          onBlur={composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))}
          onFocus={composeEventHandlers(props.onFocus, event => {
            // We normally wouldn't need this check, because we already check
            // that the focus is on the current target and not bubbling to it.
            // We do this because Safari doesn't focus buttons when clicked, and
            // instead, the wrapper will get focused and not through a bubbling event.
            const isKeyboardFocus = !isClickFocusRef.current;

            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);

              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter(item => item.focusable);
                const activeItem = items.find(item => item.active);
                const currentItem = items.find(item => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(Boolean) as typeof items;
                const candidateNodes = candidateItems.map(item => item.ref.current!);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }

            isClickFocusRef.current = false;
          })}
          onMouseDown={composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          })}
        />
      </RovingFocusProvider>
    );
  }
);

RovingFocusGroupImpl.displayName = `${GROUP_NAME}Impl`;

const RovingFocusGroup = React.forwardRef<RovingFocusGroupElement, RovingFocusGroupProps>(
  (props: ScopedProps<RovingFocusGroupProps>, forwardedRef) => {
    return (
      <Collection.Provider scope={props.__scopeRovingFocusGroup}>
        <Collection.Slot scope={props.__scopeRovingFocusGroup}>
          <RovingFocusGroupImpl
            {...props}
            ref={forwardedRef}
          />
        </Collection.Slot>
      </Collection.Provider>
    );
  }
);

RovingFocusGroup.displayName = GROUP_NAME;

export {
  RovingFocusGroup,
};

