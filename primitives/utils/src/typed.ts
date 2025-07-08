export const isFunction = (value: any): value is (...args: any[]) => any => {
  return Boolean(value && value.constructor && value.call && value.apply);
};

export const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String;
};

export const isNumber = (value: any): value is number => {
  try {
    return Number(value) === value;
  } catch {
    return false;
  }
};
export const isFloat = (value: any): value is number => {
  return isNumber(value) && value % 1 !== 0;
};

export const isInt = (value: any): value is number => {
  return isNumber(value) && value % 1 === 0;
};

export const isEqual = <TType>(x: TType, y: TType): boolean => {
  if (Object.is(x, y)) return true;
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString();
  }
  if (typeof x !== 'object' || x === null || typeof y !== 'object' || y === null) {
    return false;
  }
  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[];
  const keysY = Reflect.ownKeys(y as unknown as object);
  if (keysX.length !== keysY.length) return false;
  for (let i = 0; i < keysX.length; i += 1) {
    if (!Reflect.has(y as unknown as object, keysX[i])) return false;
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false;
  }
  return true;
};
