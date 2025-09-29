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

/**
 * 工厂函数：生成通用 resolver
 */
export function createGenericResolver(
  validate: (state: any, name?: string | string[]) => Promise<StandardSchemaV1NormalizedIssue[]>
): Middleware {
  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type === 'validateField' || action.type === 'validateFields') {
        const issues = await validate(getState(), action.name);

        dispatchIssues(dispatch, issues);

        return;
      }

      return next(action);
    };
}
