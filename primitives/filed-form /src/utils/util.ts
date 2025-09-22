// ---------------- types ----------------
export type Key = string | number;
export type PathTuple = readonly Key[];
export type NamePath = Key | PathTuple | undefined;

// For tuple paths you can later add a DeepWrite<T,P> if you want
// to express the updated type. For now we keep return type as T
// to avoid over-constraining users.

export type SetOptions = {
  /**
   * Reject dangerous keys like "__proto__", "constructor", "prototype".
   * Default: true (recommended)
   */
  safeKeys?: boolean;
};

// ---------------- utils ----------------
export const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype;

// Check if the value is a non-null object
export const isObjectRecord = (v: unknown): v is Record<Key, unknown> => v !== null && typeof v === 'object';

export const isObjectLike = (v: unknown): v is Record<string | number, unknown> => v !== null && typeof v === 'object';

export const isUnsafeKey = (k: Key) => k === '__proto__' || k === 'constructor' || k === 'prototype';

const PATH_RX = /[^.[\]]+|\[(?:([^"'[\]]+)|"([^"]*)"|'([^']*)')\]/g;

export function toPathArray(path: string): Key[] {
  const out: Key[] = [];

  path.replace(PATH_RX, (_m: string, a?: string, b?: string, c?: string) => {
    // a: unquoted inside [], b: double-quoted, c: single-quoted
    // for bare tokens (like a.b), a/b/c are undefined; use the whole match via _m
    const seg = (a || b || c || _m) as string;

    out.push(/^(0|[1-9]\d*)$/.test(seg) ? Number(seg) : seg);
    return '';
  });
  return out;
}

export function toSegments(path: NamePath): Key[] {
  if (Array.isArray(path)) return [...path];

  if (typeof path === 'string') return toPathArray(path);

  return [path as Key];
}

export const keyOfTuple = (t: PathTuple) => t.join('.');

export const keyOfName = (n: NamePath) => keyOfTuple(toSegments(n));

// Create empty container depending on next key being number or string
export function emptyContainer(nextKey: Key): any {
  return typeof nextKey === 'number' ? [] : {};
}

export const flagOn = (set: Set<string>, name: NamePath) => {
  set.add(keyOfName(name));
};
export const flagOff = (set: Set<string>, name: NamePath) => {
  set.delete(keyOfName(name));
};
export const isOn = (set: Set<string>, name: NamePath) => set.has(keyOfName(name));

export const anyOn = (set: Set<string>, names?: NamePath[]) =>
  !names || names.length === 0 ? set.size > 0 : names.some(n => set.has(keyOfName(n)));

export const allOn = (set: Set<string>, names?: NamePath[]) =>
  !names || names.length === 0 ? set.size > 0 : names.every(n => set.has(keyOfName(n)));

// ✅ Recursively collect changed paths (descend into arrays as well)
export const collectChangedLeafPaths = (
  input: any,
  prefix: (string | number)[] = [],
  out: (string | number)[][] = []
) => {
  if (Array.isArray(input)) {
    // Array nodes themselves are also treated as changes (used by List level)
    out.push([...prefix]);
    input.forEach((item, i) => collectChangedLeafPaths(item, [...prefix, keyOfName(i)], out));
  } else if (input && typeof input === 'object') {
    Object.keys(input).forEach(k => {
      collectChangedLeafPaths(input[keyOfName(k)], [...prefix, keyOfName(k)], out);
    });
  } else {
    // Atomic value, leaf
    out.push([...prefix]);
  }
  return out;
};

// ✅ To cover cases like array deletion/shortening (to notify old leaves), union with the old value's leaves as well
export const unionPaths = (a: (string | number)[][], b: (string | number)[][]) => {
  const s = new Set<string>();
  const res: (string | number)[][] = [];
  const add = (p: (string | number)[]) => {
    const k = p.join('.');
    if (!s.has(k)) {
      s.add(k);
      res.push(p);
    }
  };
  a.forEach(add);
  b.forEach(add);
  return res;
};

export const microtask =
  typeof queueMicrotask === 'function' ? queueMicrotask : (cb: () => void) => Promise.resolve().then(cb);

export const isUnderPrefix = (key: string, prefix: string): boolean => {
  if (prefix === '' || prefix === '*') return true;

  if (key === prefix) return true;

  return key.length > prefix.length && key.startsWith(prefix) && key[prefix.length] === '.';
};

export function collectDeepKeys(obj: any, prefix: string = ''): string[] {
  if (obj === null || obj === undefined) {
    // Leaf node (value is null/undefined)
    return [prefix];
  }

  if (typeof obj !== 'object' || obj instanceof Date) {
    // Primitive value (string/number/boolean/function/Date...)
    return [prefix];
  }

  // Object/Array: keep the path even if value is undefined/null
  const keys: string[] = [];

  // If empty object/array, also push itself
  if (Object.keys(obj).length === 0) {
    keys.push(prefix);
    return keys;
  }

  for (const k of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    keys.push(...collectDeepKeys(obj[k], path));
  }

  return keys;
}
