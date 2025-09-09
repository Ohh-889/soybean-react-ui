/**
 * DeepPartial<T>
 * @example
 * type User = {
 *   name: string;
 *   age: number;
 *   address: {
 *     city: string;
 *     street: string;
 *   };
 * };
 * type PartialUser = DeepPartial<User>;
 * // => { name?: string; age?: number; address?: { city?: string; street?: string } }
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? (T[K] extends (...args: any[]) => any ? T[K] : DeepPartial<T[K]>) : T[K];
};
