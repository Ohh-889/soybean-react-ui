'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/hook-use-state */
/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';
import type { ArrayElementValue, ArrayKeys } from 'skyroc-type-utils';

import type { InternalFormInstance, ListRenderItem } from '../hooks/FieldContext';
import { useFieldContext } from '../hooks/FieldContext';

/* - ListProps: props for the List component */
export type ListProps<Values = any, K extends ArrayKeys<Values> & string = ArrayKeys<Values> & string> = {
  /* - children: render function receiving 'fields' and array operation helpers */
  children: (
    /* - fields: array of item descriptors to render */
    fields: ListRenderItem[],
    /* - ops: mutation helpers for the array field */
    ops: {
      /* - insert: insert item at index */
      insert: (index: number, item: ArrayElementValue<Values, K>) => void;
      /* - move: move item from one index to another */
      move: (from: number, to: number) => void;
      /* - remove: remove item at index */
      remove: (index: number) => void;
      /* - replace: replace item at index with a new value */
      replace: (index: number, val: ArrayElementValue<Values, K>) => void;
      /* - swap: swap two items by their indices */
      swap: (i: number, j: number) => void;
    }
  ) => React.ReactNode;

  /* - initialValue: default array value for this field */
  initialValue?: ArrayElementValue<Values, K>[];

  /* - name: form path pointing to an array field */
  name: K;

  /* - preserve: keep field state when unmounted (default: true) */
  preserve?: boolean;
};

function List<Values = any>(props: ListProps<Values>) {
  const { children, initialValue, name, preserve = true } = props;

  const fieldContext = useFieldContext<Values>();

  const { arrayOp, getInternalHooks } = fieldContext as unknown as InternalFormInstance<Values>;

  const { getArrayFields, registerField } = getInternalHooks();

  const [_, forceUpdate] = useState({});

  const fields = getArrayFields(name, initialValue);

  const unregisterRef = useRef<() => void>(null);

  if (!unregisterRef.current) {
    unregisterRef.current = registerField({
      changeValue: () => {
        forceUpdate({});
      },
      initialValue,
      name,
      preserve
    });
  }

  useEffect(() => {
    return () => {
      unregisterRef.current?.();
    };
  }, []);

  return <>{children(fields, arrayOp(name))}</>;
}

export default List;
