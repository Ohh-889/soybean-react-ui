'use client';
/* eslint-disable no-bitwise */
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { AllPathsKeys } from 'skyroc-type-utils';

import type { ChangeMask } from '../../form-core/event';
import { ChangeTag } from '../../form-core/event';

import { useFieldContext } from './FieldContext';
import type { FormInstance, InternalFormInstance } from './FieldContext';

type Eq<T> = (a: T, b: T) => boolean;

type UseSelectorOpts<Values, R> = {
  /** Subscribed fields; if empty, subscribe to all */
  deps?: AllPathsKeys<Values>[];
  /** Equality comparator */
  eq?: Eq<R>;
  /** Form instance */
  form?: FormInstance<Values>;
  /** Whether to subscribe to child paths */
  includeChildren?: boolean;
  /** Change mask */
  mask?: ChangeMask;
};

/**
 * Select an arbitrary aggregated value from the form. Re-renders only when dependencies change.
 */
export function useSelector<Values = any, R = unknown>(
  selector: (get: (n: AllPathsKeys<Values>) => any, all: Values) => R,
  opts?: UseSelectorOpts<Values, R>
): R {
  const ctxForm = useFieldContext<Values>();
  const form = opts?.form ?? ctxForm;

  const eq = opts?.eq ?? Object.is;

  if (!form) {
    throw new Error('Can not find FormContext. Please make sure you wrap Field under Form or provide a form instance.');
  }

  const { getInternalHooks } = form as unknown as InternalFormInstance<Values>;
  const { subscribeField } = getInternalHooks();

  const deps = opts?.deps;

  const mask = opts?.mask ?? ChangeTag.Value;
  const includeChildren = opts?.includeChildren;

  // Compute current selected value
  const compute = () => {
    const getField = form.getFieldValue;
    const all = form.getFieldsValue() as Values;
    return selector(getField, all);
  };

  // Use state + ref to debounce rendering
  const [val, setVal] = useState<R>(compute);

  const prevRef = useRef<R>(val);

  useEffect(() => {
    // Subscriber
    const onChange = () => {
      const next = compute();
      if (!eq(prevRef.current, next)) {
        prevRef.current = next;
        // Keep consistent with useFieldState: flush synchronously to reduce flicker
        flushSync(() => setVal(next));
      }
    };

    // Subscribe to specified fields
    return subscribeField(deps, onChange, {
      includeChildren,
      mask
    });
  }, []);

  return val;
}
