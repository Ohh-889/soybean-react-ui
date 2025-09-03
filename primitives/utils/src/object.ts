import { isArray, isDate, isObject } from 'radash';

import { isNil } from './typed';

export const shallowEqual = (a: any, b: any) => {
  if (Object.is(a, b)) return true;

  if (!isObject(a) || !isObject(b)) return false;

  const ka = Object.keys(a);

  const kb = Object.keys(b);

  if (ka.length !== kb.length) return false;

  for (const k of ka) if (!Object.is(a[k as keyof typeof a], (b as Record<string, any>)[k])) return false;

  return true;
};

export const isObjectType = (value: unknown): value is object => typeof value === 'object';

export const isEventObject = (event: unknown): event is Event => {
  return isObject(event) || (!isArray(event) && !isNil(event) && isObjectType(event) && !isDate(event));
};
