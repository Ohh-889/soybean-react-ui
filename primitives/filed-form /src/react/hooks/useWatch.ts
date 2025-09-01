// useWatch.ts
'use client';
import * as React from 'react';
import { useSyncExternalStore } from 'react';

import { useFieldContext } from './FieldContext';
import { ChangeTag } from './events';
import type { NamePath } from './types';

export function useWatch(name: NamePath | NamePath[], opt?: { includeChildren?: boolean }) {
  const form = useFieldContext();
  const names = Array.isArray(name) ? name : [name];

  const subscribe = React.useCallback(
    (on: () => void) => {
      const offs = names.map(n =>
        form.__store.subscribeField(n, () => on(), {
          includeChildren: Boolean(opt?.includeChildren),
          mask: ChangeTag.Value
        })
      );
      return () => offs.forEach(f => f());
    },
    [form, names.map(String).join('|'), opt?.includeChildren]
  );

  const getSnapshot = React.useCallback(
    () => (Array.isArray(name) ? form.getFieldsValue(...name) : form.getFieldValue(name)),
    [form, names.map(String).join('|')]
  );
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return Array.isArray(name) ? form.getFieldsValue(...name) : form.getFieldValue(name);
}
