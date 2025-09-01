// useFieldState.ts
'use client';
import * as React from 'react';
import { useSyncExternalStore } from 'react';

import { useFieldContext } from './FieldContext';
import type { ChangeMask } from './events';
import { ChangeTag } from './events';
import type { Meta, NamePath } from './types';

export function useFieldState(
  name: NamePath,
  mask: ChangeMask = ChangeTag.Value | ChangeTag.Errors | ChangeTag.Validating
): Meta {
  const form = useFieldContext();
  const subscribe = React.useCallback(
    (on: () => void) => {
      return form.__store.subscribeField(name, () => on(), { mask });
    },
    [form, name, mask]
  );
  const getSnapshot = React.useCallback(() => form.__store.getField(name), [form, name]);

  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return form.__store.getField(name);
}
