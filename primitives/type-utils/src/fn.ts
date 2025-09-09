export type Fn = (...args: any[]) => any;

export type Noop = () => void;

/**
 * - get all the function types in an object
 * @example
 * interface Foo {
 *   a: number;
 *   b?: string;
 *   c(): void;
 *   d: (x: number) => string;
 *   e?: () => void;     // optional also can be recognized
 * }
 * type FooFnTypes = {
 *   c: () => void;
 *   d: (x: number) => string;
 *   e?: (() => void) | undefined;
   }
 */
export type OnlyFunctions<T> = {
  [K in keyof T as NonNullable<T[K]> extends Fn ? K : never]: T[K];
};

/**
 * - get all the function keys in an object
 * @example
 * interface Foo {
 *   a: number;
 *   b?: string;
 *   c(): void;
 *   d: (x: number) => string;
 *   e?: () => void;
 * }
 * type FooFnKeys  = FunctionKeys<Foo>;  // 'c' | 'd' | 'e'
 */
export type FunctionKeys<T> = {
  [K in keyof T]?: NonNullable<T[K]> extends Fn ? K : never;
}[keyof T];

/**
 * - get all the function types in an object
 * @example
 * interface Foo {
 *   a: number;
 *   b?: string;
 *   c(): void;
 *   d: (x: number) => string;
 *   e?: () => void;
 * }
 * type FooFnTypes  = FunctionUnion<Foo>;  // (() => void) | ((x:number)=>string) | (()=>void)
 */
export type FunctionUnion<T> = {
  [K in keyof T]: NonNullable<T[K]> extends Fn ? T[K] : never;
}[keyof T];
