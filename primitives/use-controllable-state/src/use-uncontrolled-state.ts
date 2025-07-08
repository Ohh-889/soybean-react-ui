import React, { useEffect, useRef, useState } from 'react';
import { useLayoutEffect } from 'soybean-react-ui/use-layout-effect';

import type { ChangeHandler, UseControllableStateParams } from './types';

// Prevent bundlers from trying to optimize the import
const useInsertionEffect: typeof useLayoutEffect =
  (React as any)[' useInsertionEffect '.trim().toString()] || useLayoutEffect;

export function useUncontrolledState<T>({
  defaultProp,
  onChange
}: Omit<UseControllableStateParams<T>, 'prop'>): [
  Value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>,
  OnChangeRef: React.RefObject<ChangeHandler<T> | undefined>
] {
  const [value, setValue] = useState(defaultProp);

  const prevValueRef = useRef(value);

  const onChangeRef = useRef(onChange);

  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);

  return [value, setValue, onChangeRef];
}
