import { isArray } from 'radash';

import { isNil } from './typed';

export function toArray<T>(value?: T | T[] | null): T[] {
  if (isNil(value)) {
    return [];
  }

  return isArray(value) ? value : [value];
}
