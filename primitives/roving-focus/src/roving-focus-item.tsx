import { forwardRef, useEffect } from "react";
import { RovingFocusItemElement, RovingFocusItemProps, ScopedProps } from "./types";
import { Collection, useCollection, useRovingFocusContext } from "./context";
import { useId } from 'soybean-react-ui/id';
import { Primitive, composeEventHandlers } from 'soybean-react-ui/primitive';
import { focusFirst, getFocusIntent, wrapArray } from "./shared";

const ITEM_NAME = 'RovingFocusGroupItem';

const RovingFocusGroupItem = forwardRef<RovingFocusItemElement, RovingFocusItemProps>(
  (props: ScopedProps<RovingFocusItemProps>, forwardedRef) => {

    const { __scopeRovingFocusGroup, active = false, children, focusable = true, tabStopId, ...itemProps } = props;

    const autoId = useId();

    const id = tabStopId || autoId;

    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);

    const isCurrentTabStop = context.currentTabStopId === id;

    const getItems = useCollection(__scopeRovingFocusGroup);

    const { currentTabStopId, onFocusableItemAdd, onFocusableItemRemove } = context;

    useEffect(() => {
      if (focusable) {

        onFocusableItemAdd();

        return () => onFocusableItemRemove();
      }

      return () => {};
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);

    return (
      <Collection.ItemSlot
        active={active}
        focusable={focusable}
        id={id}
        scope={__scopeRovingFocusGroup}
      >
        <Primitive.span
          data-orientation={context.orientation}
          tabIndex={isCurrentTabStop ? 0 : -1}
          {...itemProps}
          ref={forwardedRef}
          onFocus={composeEventHandlers(props.onFocus, () => context.onItemFocus(id))}
          onKeyDown={composeEventHandlers(props.onKeyDown, event => {
            if (event.key === 'Tab' && event.shiftKey) {
              context.onItemShiftTab();
              return;
            }

            if (event.target !== event.currentTarget) return;

            const focusIntent = getFocusIntent(event, context.orientation, context.dir);

            if (focusIntent !== undefined) {
              if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
              event.preventDefault();
              const items = getItems().filter(item => item.focusable);
              let candidateNodes = items.map(item => item.ref.current!);

              if (focusIntent === 'last') candidateNodes.reverse();
              else if (focusIntent === 'prev' || focusIntent === 'next') {
                if (focusIntent === 'prev') candidateNodes.reverse();
                const currentIndex = candidateNodes.indexOf(event.currentTarget);
                candidateNodes = context.loop
                  ? wrapArray(candidateNodes, currentIndex + 1)
                  : candidateNodes.slice(currentIndex + 1);
              }

              /**
               * Imperative focus during keydown is risky so we prevent React's batching updates
               * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
               */
              setTimeout(() => focusFirst(candidateNodes));
            }
          })}
          onMouseDown={composeEventHandlers(props.onMouseDown, event => {
            // We prevent focusing non-focusable items on `mousedown`.
            // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
            if (!focusable) event.preventDefault();
            // Safari doesn't focus a button when clicked so we run our logic on mousedown also
            else context.onItemFocus(id);
          })}
        >
          {typeof children === 'function'
            ? children({ hasTabStop: currentTabStopId !== null, isCurrentTabStop })
            : children}
        </Primitive.span>
      </Collection.ItemSlot>
    );
  }
);

RovingFocusGroupItem.displayName = ITEM_NAME;
