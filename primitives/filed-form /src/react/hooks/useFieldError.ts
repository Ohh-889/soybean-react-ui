'use client';

import type { AllPathsKeys } from 'skyroc-type-utils';
import { isString } from 'skyroc-utils';

import type { FormInstance } from './FieldContext';
import { useFieldState } from './useFieldState';

type UseWatchOpts<Values = any> = {
  form?: FormInstance<Values>;
};

export type ErrorShape<
  Values,
  Names extends readonly AllPathsKeys<Values>[] | undefined = undefined
> = Names extends readonly AllPathsKeys<Values>[]
  ? {
      [K in Names[number]]: string[];
    }
  : {
      [K in AllPathsKeys<Values>]: string[];
    };

function useFieldError<Values, T extends AllPathsKeys<Values>>(name: T, opts?: UseWatchOpts<Values>): string[];

function useFieldError<Values, T extends AllPathsKeys<Values>>(
  names: T[],
  opts?: UseWatchOpts<Values>
): ErrorShape<Values, T[]>;

function useFieldError<Values = any>(form: FormInstance<Values>): ErrorShape<Values, AllPathsKeys<Values>[]>;

function useFieldError<Values = any>(): ErrorShape<Values, AllPathsKeys<Values>[]>;

function useFieldError<Values = any, T extends AllPathsKeys<Values> = AllPathsKeys<Values>>(
  names?: T[] | T | FormInstance<Values>,
  opts?: UseWatchOpts<Values>
) {
  const isSingleField = isString(names);

  const state = useFieldState<Values>(names as any, { ...opts, mask: { errors: true } });

  return isSingleField
    ? state.errors
    : Object.fromEntries(Object.entries(state).map(([key, value]) => [key, value.errors]));
}

export { useFieldError };
