/**
 * @description
 * without changing the type’s semantics, it only prettifies the IDE display—flattening the shape so hints are easier to read.
 * @example
 * type Raw = { a: number } & { b: string };
 * type Pretty = Prettify<Raw>;
 * // => { a: number; b: string; }
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
