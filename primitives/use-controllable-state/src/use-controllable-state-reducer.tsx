import * as React from 'react';
import { useEffectEvent } from 'soybean-react-ui/use-effect-event';

import type { AnyAction, AnyObject, UseControllableStateParams } from './types';

interface SyncStateAction<T> {
  state: T;
  type: typeof SYNC_STATE;
}

const SYNC_STATE = Symbol('SOYBEAN:SYNC_STATE');

export function useControllableStateReducer<T, S extends AnyObject, A extends AnyAction>(
  reducer: (prevState: S & { state: T }, action: A) => S & { state: T },
  userArgs: UseControllableStateParams<T>,
  initialState: S
): [S & { state: T }, React.Dispatch<A>];

// eslint-disable-next-line max-params
export function useControllableStateReducer<T, S extends AnyObject, I, A extends AnyAction>(
  reducer: (prevState: S & { state: T }, action: A) => S & { state: T },
  userArgs: UseControllableStateParams<T>,
  initialArg: I,
  init: (i: I & { state: T }) => S
): [S & { state: T }, React.Dispatch<A>];

// eslint-disable-next-line max-params
export function useControllableStateReducer<T, S extends AnyObject, A extends AnyAction>(
  reducer: (prevState: S & { state: T }, action: A) => S & { state: T },
  userArgs: UseControllableStateParams<T>,
  initialArg: any,
  init?: (i: any) => Omit<S, 'state'>
): [S & { state: T }, React.Dispatch<A>] {
  const { caller, defaultProp, onChange: onChangeProp, prop: controlledState } = userArgs;
  const isControlled = controlledState !== undefined;

  const onChange = useEffectEvent(onChangeProp);

  // OK to disable conditionally calling hooks here because they will always run
  // consistently in the same environment. Bundlers should be able to remove the
  // code block entirely in production.
  /* eslint-disable react-hooks/rules-of-hooks */
  // eslint-disable-next-line n/prefer-global/process
  if (process.env.NODE_ENV !== 'production') {
    const isControlledRef = React.useRef(controlledState !== undefined);
    React.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? 'controlled' : 'uncontrolled';
        const to = isControlled ? 'controlled' : 'uncontrolled';
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  /* eslint-enable react-hooks/rules-of-hooks */

  type InternalState = S & { state: T };
  const args: [InternalState] = [{ ...initialArg, state: defaultProp }];
  if (init) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    args.push(init);
  }

  const [internalState, dispatch] = React.useReducer(
    (state: InternalState, action: A | SyncStateAction<T>): InternalState => {
      if (action.type === SYNC_STATE) {
        return { ...state, state: action.state };
      }

      const next = reducer(state, action);
      if (isControlled && !Object.is(next.state, state.state)) {
        onChange(next.state);
      }
      return next;
    },
    ...args
  );

  const uncontrolledState = internalState.state;
  const prevValueRef = React.useRef(uncontrolledState);
  React.useEffect(() => {
    if (prevValueRef.current !== uncontrolledState) {
      prevValueRef.current = uncontrolledState;
      if (!isControlled) {
        onChange(uncontrolledState);
      }
    }
  }, [onChange, uncontrolledState, prevValueRef, isControlled]);

  const state = React.useMemo(() => {
    const isCanControl = controlledState !== undefined;
    if (isCanControl) {
      return { ...internalState, state: controlledState };
    }

    return internalState;
  }, [internalState, controlledState]);

  React.useEffect(() => {
    // Sync internal state for controlled components so that reducer is called
    // with the correct state values
    if (isControlled && !Object.is(controlledState, internalState.state)) {
      dispatch({ state: controlledState, type: SYNC_STATE });
    }
  }, [controlledState, internalState.state, isControlled]);

  return [state, dispatch as React.Dispatch<A>];
}
