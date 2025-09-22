// ---------------- impl ----------------

import type { NamePath, SetOptions } from './util';
import { emptyContainer, isObjectLike, isPlainObject, isUnsafeKey, toSegments } from './util';

/**
 * Immutable deep set. Creates intermediate containers as needed.
 * Never mutates the original object. Does not use `delete`.
 */
export function set<T, V>(obj: T, path: NamePath, value: V, options: SetOptions = { safeKeys: true }): T {
  const segs = toSegments(path);

  if (segs.length === 0) return obj; // empty path -> no-op (or you could return value as new root)

  const { safeKeys = true } = options;

  const setImpl = (node: unknown, i: number): unknown => {
    const key = segs[i];

    if (safeKeys && isUnsafeKey(key)) {
      // Skip writing unsafe keys; return original node unchanged
      return node;
    }

    const isLast = i === segs.length - 1;

    // Choose base container for current level
    let base: any;
    if (Array.isArray(node)) {
      base = node.slice(); // clone array
    } else if (isPlainObject(node)) {
      base = { ...node }; // clone plain object
    } else {
      // primitive or non-plain object -> start fresh container
      base = emptyContainer(key);
    }

    if (isLast) {
      // write leaf
      if (Array.isArray(base)) {
        base[key as number] = value;
      } else {
        base[key as any] = value;
      }
      return base;
    }

    // recurse for child
    const nextChild = isObjectLike(node) ? (node as any)[key as any] : undefined;
    const written = setImpl(nextChild, i + 1);

    if (Array.isArray(base)) {
      base[key as number] = written;
    } else {
      base[key as any] = written;
    }
    return base;
  };

  return setImpl(obj, 0) as T;
}

export function unset<T>(obj: T, path: NamePath, options: SetOptions = { safeKeys: true }): T {
  const segs = toSegments(path);
  if (segs.length === 0) return obj;

  const { safeKeys = true } = options;

  const unsetImpl = (node: unknown, i: number): unknown => {
    const key = segs[i];
    if (safeKeys && isUnsafeKey(key)) return node;

    const isLast = i === segs.length - 1;

    if (Array.isArray(node)) {
      const arr = node.slice();
      if (isLast) {
        arr.splice(key as number, 1); // Remove the element and shift left
        return arr;
      }
      arr[key as number] = unsetImpl(arr[key as number], i + 1);
      return arr;
    }

    if (isPlainObject(node)) {
      const out: Record<string, unknown> = {};
      for (const k in node as any) {
        if (Object.hasOwn(node, k)) {
          if (isLast && k === key) {
            // Skip this key; do not write to out
            continue;
          }
          out[k] = k === key ? unsetImpl((node as any)[k], i + 1) : (node as any)[k];
        }
      }
      return out;
    }
    return node;
  };

  return unsetImpl(obj, 0) as T;
}

export const construct = <T extends Record<string, any>>(obj: T): T => {
  if (!obj) return {} as T;

  let acc: Record<string, any> = {};

  for (const [path, value] of Object.entries(obj)) {
    acc = set(acc, path, value);
  }

  return acc as T;
};
