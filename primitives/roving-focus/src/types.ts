import type { Scope } from 'soybean-react-ui/context';
import { Primitive } from 'soybean-react-ui/primitive';


export type Orientation = React.AriaAttributes['aria-orientation'];

export type Direction = 'ltr' | 'rtl';


export interface RovingFocusGroupImplProps extends Omit<PrimitiveDivProps, 'dir'>, RovingFocusGroupOptions {
  currentTabStopId?: string | null;
  defaultCurrentTabStopId?: string;
  onCurrentTabStopIdChange?: (tabStopId: string | null) => void;
  onEntryFocus?: (event: Event) => void;
  preventScrollOnEntryFocus?: boolean;
}


export type RovingFocusGroupImplElement = React.ComponentRef<typeof Primitive.div>;

export type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

export interface RovingFocusGroupOptions {
  /**
   * The direction of navigation between items.
   */
  dir?: Direction;
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean;
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: Orientation;
}

export type RovingContextValue = RovingFocusGroupOptions & {
  currentTabStopId: string | null;
  onFocusableItemAdd(): void;
  onFocusableItemRemove(): void;
  onItemFocus(tabStopId: string): void;
  onItemShiftTab(): void;
};

export type ItemData = { active: boolean; focusable: boolean; id: string };

export type ScopedProps<P> = P & { __scopeRovingFocusGroup?: Scope };



export type RovingFocusGroupElement = RovingFocusGroupImplElement;

export type RovingFocusGroupProps = RovingFocusGroupImplProps;


export type RovingFocusItemElement = React.ComponentRef<typeof Primitive.span>;

export type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

export interface RovingFocusItemProps extends Omit<PrimitiveSpanProps, 'children'> {
  active?: boolean;
  children?: React.ReactNode | ((props: { hasTabStop: boolean; isCurrentTabStop: boolean }) => React.ReactNode);
  focusable?: boolean;
  tabStopId?: string;
}


export type FocusIntent = 'first' | 'last' | 'next' | 'prev';
