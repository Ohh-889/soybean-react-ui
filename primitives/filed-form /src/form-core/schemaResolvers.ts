import { keyOfName } from '../utils/util';

import type { Middleware } from './middleware';
import { dispatchErrors } from './resolvers';

type Issue = { message: string; path?: (string | number)[] };

interface StandardSchemaV1<Input = unknown, Output = Input> {
  readonly '~standard': {
    validate(input: unknown): { issues?: undefined; value: Output } | { issues: Issue[] };
    vendor: string;
    version: number;
  };
}

function isStandardSchema(obj: any): obj is StandardSchemaV1 {
  return obj && obj['~standard'] !== null && typeof obj['~standard'].validate === 'function';
}

export function createStandardResolver(schema: StandardSchemaV1): Middleware {
  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type !== 'validateField') {
        return next(action);
      }
      const name = keyOfName(action.name);

      // run validation on full state (or pick/partial for single field)
      const state = getState();
      let result = schema['~standard'].validate(state);

      // if async
      if (result instanceof Promise) {
        result = await result;
      }

      if (!('issues' in result)) {
        // success
        dispatch({ entries: [[name, []]], type: 'setExternalErrors' });
      } else {
        const issues =
          result.issues?.map(issue => ({
            message: issue.message,
            path: issue.path ? issue.path.map(seg => String(seg)).join('.') : name
          })) || [];
        // convert to your dispatchErrors logic
        dispatchErrors(dispatch, name, issues);
      }
    };
}
