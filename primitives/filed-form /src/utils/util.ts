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

// ✅ 递归收集变更路径（会把数组也往里走）
export const collectChangedLeafPaths = (
  input: any,
  prefix: (string | number)[] = [],
  out: (string | number)[][] = []
) => {
  if (Array.isArray(input)) {
    // 数组节点本身也视为变更（用于 List 层级）
    out.push([...prefix]);
    input.forEach((item, i) => collectChangedLeafPaths(item, [...prefix, keyOfName(i)], out));
  } else if (input && typeof input === 'object') {
    Object.keys(input).forEach(k => {
      collectChangedLeafPaths(input[keyOfName(k)], [...prefix, keyOfName(k)], out);
    });
  } else {
    // 原子值，叶子
    out.push([...prefix]);
  }
  return out;
};

// ✅ 如果想覆盖“删除/缩短数组”的场景（通知旧叶子），可以把旧值的叶子也并上
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
    // 叶子节点（值是 null/undefined）
    return [prefix];
  }

  if (typeof obj !== 'object' || obj instanceof Date) {
    // 基础值（string/number/boolean/function/Date...）
    return [prefix];
  }

  // 对象/数组：即使值是 undefined/null，也要保留路径
  const keys: string[] = [];

  // 如果是空对象/数组，也要把自己 push 出来
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
