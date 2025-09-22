'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/hook-use-state */
/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';
import type { ArrayKeys } from 'skyroc-type-utils';

import type { StoreValue } from '../../form-core/types';
import type { InternalFormInstance, ListRenderItem } from '../hooks/FieldContext';
import { useFieldContext } from '../hooks/FieldContext';

/* - ListProps: props for the List component */
export type ListProps<Values = any> = {
  /* - children: render function receiving 'fields' and array operation helpers */
  children: (
    /* - fields: array of item descriptors to render */
    fields: ListRenderItem[],
    /* - ops: mutation helpers for the array field */
    ops: {
      /* - insert: insert item at index */
      insert: (index: number, item: any) => void;
      /* - move: move item from one index to another */
      move: (from: number, to: number) => void;
      /* - remove: remove item at index */
      remove: (index: number) => void;
      /* - replace: replace item at index with a new value */
      replace: (index: number, val: any) => void;
      /* - swap: swap two items by their indices */
      swap: (i: number, j: number) => void;
    }
  ) => React.ReactNode;

  /* - initialValue: default array value for this field */
  initialValue?: StoreValue[];

  /* - name: form path pointing to an array field */
  name: ArrayKeys<Values> & string;

  /* - preserve: keep field state when unmounted (default: true) */
  preserve?: boolean;
};

function List<Values = any>(props: ListProps<Values>) {
  const { children, initialValue, name, preserve = true } = props;

  const fieldContext = useFieldContext<Values>();

  const { getInternalHooks } = fieldContext as unknown as InternalFormInstance<Values>;

  const { dispatch, getArrayFields, registerField } = getInternalHooks();

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

  const ops = {
    insert: (index: number, item: any) => {
      dispatch({ args: { index, item }, name, op: 'insert', type: 'arrayOp' });
    },
    move: (from: number, to: number) => {
      dispatch({ args: { from, to }, name, op: 'move', type: 'arrayOp' });
    },
    remove: (index: number) => {
      dispatch({ args: { index }, name, op: 'remove', type: 'arrayOp' });
    },
    replace: (index: number, val: any) => {
      dispatch({ args: { index, item: val }, name, op: 'replace', type: 'arrayOp' });
    },
    swap: (i: number, j: number) => {
      dispatch({ args: { i, j }, name, op: 'swap', type: 'arrayOp' });
    }
  };

  return <>{children(fields, ops)}</>;
}

export default List;
