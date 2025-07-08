import type { Dispatch, SetStateAction } from 'react';

export type ChangeHandler<T> = (state: T) => void;

export type SetStateFn<T> = Dispatch<SetStateAction<T>>;

export interface UseControllableStateParams<T> {
  caller?: string;
  defaultProp: T;
  onChange?: ChangeHandler<T>;
  prop?: T | undefined;
}

export type AnyAction = {
  type: string;
};

export type AnyObject = Record<string, unknown>;
