import { isObject } from 'radash';

export const shallowEqual = (a: any, b: any) => {
  if (Object.is(a, b)) return true;

  if (!isObject(a) || !isObject(b)) return false;

  const ka = Object.keys(a);

  const kb = Object.keys(b);

  if (ka.length !== kb.length) return false;

  for (const k of ka) if (!Object.is(a[k as keyof typeof a], (b as Record<string, any>)[k])) return false;
  return true;
};
