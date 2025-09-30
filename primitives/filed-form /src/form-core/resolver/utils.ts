/* eslint-disable consistent-return */

import type { AllPathsKeys } from 'skyroc-type-utils';

import { keyOfName } from '../../utils/util';
import type { Action, Middleware } from '../middleware';

import type { StandardSchemaV1NormalizedIssue } from './standard';

export function toEntries<Values = any>(issues: StandardSchemaV1NormalizedIssue[]): [AllPathsKeys<Values>, string[]][] {
  const map = new Map<string, string[]>();
  for (const { message, path } of issues) {
    const k = keyOfName(path);

    const arr = map.get(k) || [];
    arr.push(message);
    map.set(k, arr);
  }
  return Array.from(map.entries()) as [AllPathsKeys<Values>, string[]][];
}

export function dispatchIssues<Values = any>(
  dispatch: (a: Action<Values>) => void,
  issues: StandardSchemaV1NormalizedIssue[]
) {
  const entries = toEntries<Values>(issues);

  dispatch({ entries, type: 'setExternalErrors' });
}

export function createGenericResolver<Values = any>(
  validate: (state: Values, name?: string | string[]) => Promise<StandardSchemaV1NormalizedIssue[]>
): Middleware<Values> {
  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type !== 'validateField' && action.type !== 'validateFields') {
        return next(action);
      }

      const state = getState();

      if (action.type === 'validateField') {
        const name = keyOfName(action.name) as AllPathsKeys<Values>;
        const issues = await validate(state, name);

        const filtered = issues.filter(it => it.path.join('.') === name);

        if (filtered.length > 0) {
          dispatchIssues(dispatch, filtered);
        } else {
          dispatch({ entries: [[name, []]], type: 'setExternalErrors' });
        }

        return;
      }

      if (action.type === 'validateFields') {
        const issues = await validate(state, action.name?.map(keyOfName));
        dispatchIssues(dispatch, issues);
      }
    };
}
