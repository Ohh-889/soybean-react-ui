'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/hook-use-state */
/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';
import type { AllPaths } from 'skyroc-type-utils';

import type { StoreValue } from '../../form-core/types';
import { keyOfName } from '../../utils/util';
import type { InternalFormInstance } from '../hooks/FieldContext';
import { useFieldContext } from '../hooks/FieldContext';

export type ListRenderItem = {
  key: string;
  name: string;
};

export type ListProps<Values = any> = {
  // array path
  children: (
    fields: ListRenderItem[],
    ops: {
      insert: (index: number, item: any) => void;
      move: (from: number, to: number) => void;
      remove: (index: number) => void;
      replace: (index: number, val: any) => void;
      swap: (i: number, j: number) => void;
    }
  ) => React.ReactNode;
  initialValue?: StoreValue[];
  name: AllPaths<Values>;
};

function move<T>(arr: T[], from: number, to: number): T[] {
  const clone = arr.slice();
  const item = clone.splice(from, 1)[0];
  clone.splice(to, 0, item);
  return clone;
}

function List<Values = any>(props: ListProps<Values>) {
  const { children, initialValue, name } = props;

  const fieldContext = useFieldContext<Values>();

  const keyRef = useRef({ id: 0, keys: [] as number[] });
  const keyManager = keyRef.current;

  const { getFieldValue, getInternalHooks } = fieldContext as unknown as InternalFormInstance<Values>;

  const { dispatch, registerField } = getInternalHooks();

  const [_, forceUpdate] = useState({});

  const arr = (getFieldValue(name) as any[]) || initialValue || [];

  const fields = arr.map((___, i) => {
    let key = keyManager.keys[i];
    if (key === undefined) {
      keyManager.keys[i] = keyManager.id++;
      key = keyManager.keys[i];
    }
    return {
      key: String(key), // Stable key
      name: `${keyOfName(name)}.${i}`
    };
  });

  const unregisterRef = useRef<() => void>(null);

  if (!unregisterRef.current) {
    unregisterRef.current = registerField({
      changeValue: (newValue, __, ___, mask) => {
        forceUpdate({});
      },
      initialValue,
      name,
      preserve: true
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
      keyManager.keys.splice(index, 0, keyManager.id++);
    },
    move: (from: number, to: number) => {
      dispatch({ args: { from, to }, name, op: 'move', type: 'arrayOp' });
      keyManager.keys = move(keyManager.keys, from, to);
    },
    remove: (index: number) => {
      dispatch({ args: { index }, name, op: 'remove', type: 'arrayOp' });
      keyManager.keys.splice(index, 1);
    },
    replace: (index: number, val: any) => {
      dispatch({ args: { index, item: val }, name, op: 'replace', type: 'arrayOp' });
    },
    swap: (i: number, j: number) => {
      dispatch({ args: { i, j }, name, op: 'swap', type: 'arrayOp' });
      [keyManager.keys[i], keyManager.keys[j]] = [keyManager.keys[j], keyManager.keys[i]];
    }
  };

  return <>{children(fields, ops)}</>;
}

export default List;
