/* eslint-disable consistent-return */

import type { AllPathsKeys } from 'skyroc-type-utils';
import { toArray } from 'skyroc-utils';

import { keyOfName } from '../utils/util';

import type { Action, Middleware } from './middleware';

// ========== Common error handling utilities ==========
type ErrMap = Map<string, string[]>;

function mergeErr(m: ErrMap, key: string, msg: string) {
  const k = keyOfName(key);
  const arr = m.get(k) || [];
  arr.push(msg);
  m.set(k, arr);
}

export function dispatchErrors(dispatch: (a: Action) => void, issues: { message: string; path: string }[]) {
  const m: ErrMap = new Map();

  issues.forEach(err => {
    if (err.path) mergeErr(m, err.path, err.message);
  });

  const entries = Array.from(m.entries());

  dispatch({ entries, type: 'setExternalErrors' });
}

// ========== Yup Resolver ==========
export function createYupResolver(schema: any): Middleware {
  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type !== 'validateField') return next(action);

      const name = action.name;
      try {
        if (name) {
          await schema.validateAt(name, getState());
          dispatch({ entries: [[keyOfName(name), []]], type: 'setExternalErrors' });
        } else {
          await schema.validate(getState(), { abortEarly: false });
          dispatch({ entries: [], type: 'setExternalErrors' }); // clear all
        }
      } catch (e: any) {
        const issues = (e.inner || []).map((err: any) => ({
          message: err.message,
          path: err.path
        }));
        dispatchErrors(dispatch, name, issues);
      }
    };
}

const validateList = ['validateField', 'validateFields'];

// ========== Zod Resolver ==========
export function createZodResolver<Values = any>(schema: any): Middleware<Values, AllPathsKeys<Values>> {
  return ({ dispatch, getState }) =>
    next =>
    action => {
      const type = action.type;

      if (type !== 'validateField' && type !== 'validateFields') {
        return next(action);
      }

      const res = schema.safeParse(getState());

      const names = toArray(action.name);

      if (res.success) {
        dispatch({ entries: [[name, []]], type: 'setExternalErrors' });
        return;
      }

      const issues = res.error?.issues.map((issue: any) => ({
        message: issue.message,
        path: issue.path?.length ? issue.path.join('.') : 'root'
      }));
      dispatchErrors(dispatch, issues || []);
    };
}

// ========== AsyncValidator Resolver ==========
export function createAsyncValidatorResolver(descriptor: any, options?: any): Middleware {
  const AsyncValidator = (descriptor as any).default ?? descriptor;
  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type !== 'validateField') return next(action);

      const name = keyOfName(action.name);

      const validator = new AsyncValidator(descriptor);

      try {
        await validator.validate(getState(), {
          ...options,
          keys: name ? [name] : undefined
        });
        dispatch({ entries: [[keyOfName(name), []]], type: 'setExternalErrors' });
      } catch (e: any) {
        const issues = (e.errors || []).map((it: any) => ({
          message: it.message,
          path: it.field || 'root'
        }));
        dispatchErrors(dispatch, name, issues);
      }
    };
}
