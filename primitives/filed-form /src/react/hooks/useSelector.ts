// useSelector.ts
'use client';
import * as React from 'react';
import { useSyncExternalStore } from 'react';

import { useFieldContext } from './FieldContext';
import type { ChangeMask } from './events';
import { ChangeTag } from './events';
import type { NamePath } from './types';

type Eq<T> = (a: T, b: T) => boolean;

export function useSelector<T>(
  selector: (get: (n: NamePath) => any, all: any) => T,
  eq: Eq<T> = Object.is,
  opt?: { mask?: ChangeMask; names?: NamePath[] }
): T {
  const form = useFieldContext();
  const mask = opt?.mask ?? ChangeTag.Value | ChangeTag.Errors | ChangeTag.Validating;
  const names = opt?.names || [];

  const getSel = React.useCallback(
    () => selector(form.getFieldValue.bind(form), form.getFieldsValue()),
    [form, selector]
  );

  const subscribe = React.useCallback(
    (on: () => void) => {
      if (!names.length) {
        // 全局订阅：任意字段改变都试着比较
        return form.__store.subscribeField([], () => on(), { includeChildren: true, mask });
      }
      const offs = names.map(n => form.__store.subscribeField(n, () => on(), { includeChildren: true, mask }));
      return () => offs.forEach(f => f());
    },
    [form, names.map(String).join('|'), mask]
  );

  const getSnap = React.useRef<T>(getSel());
  const getSnapshot = () => getSnap.current;
  const serverSnapshot = getSnapshot;

  useSyncExternalStore(
    subscribe,
    () => {
      const next = getSel();
      const prev = getSnap.current;
      if (!eq(prev, next)) getSnap.current = next;
      return getSnap.current;
    },
    serverSnapshot
  );

  return getSnap.current;
}
