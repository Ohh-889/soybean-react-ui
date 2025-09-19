'use client';

import type { AllPathsKeys, PathToDeepType, ShapeFromPaths } from 'skyroc-type-utils';
import { isString } from 'skyroc-utils';

import type { FormInstance } from './FieldContext';
import { useFieldState } from './useFieldState';

type UseWatchOpts<Values = any> = {
  form: FormInstance<Values>;
  includeChildren?: boolean;
};

function useWatch<Values, T extends AllPathsKeys<Values>>(
  name: T,
  opts: UseWatchOpts<Values>
): PathToDeepType<Values, T>;

function useWatch<Values, T extends AllPathsKeys<Values>>(
  names: T[],
  opts: UseWatchOpts<Values>
): ShapeFromPaths<Values, T[]>;

function useWatch<Values = any>(form: FormInstance<Values>): Values;

function useWatch<Values = any>(): Values;

function useWatch<Values = any, T extends AllPathsKeys<Values> = AllPathsKeys<Values>>(
  names?: T[] | T | FormInstance<Values>,
  opts?: UseWatchOpts<Values>
) {
  const isSingleField = isString(names);

  const state = useFieldState<Values>(names as any, { ...opts, mask: { value: true } });

  return isSingleField
    ? state.value
    : Object.fromEntries(Object.entries(state).map(([key, value]) => [key, value.value]));
}

export { useWatch };
