import type { Middleware } from '../middleware';

import type { StandardSchemaV1, StandardSchemaV1NormalizedIssue } from './standard';
import { createStandardResolver, isStandardSchema } from './standard';
import { createGenericResolver } from './utils';

export type FormSchema<Values = any> =
  | StandardSchemaV1<Values>
  | ((state: Values, name: string | string[] | undefined) => Promise<StandardSchemaV1NormalizedIssue[]>);

function noopMiddleware<Values = any>(): Middleware<Values> {
  return () => next => action => next(action);
}

export function resolveSchema<Values = any>(schema: FormSchema<Values>): Middleware<Values> {
  if (isStandardSchema(schema)) {
    return createStandardResolver(schema);
  }

  if (typeof schema === 'function') {
    return createGenericResolver(schema);
  }

  console.warn('[resolveSchema] Unsupported schema type, ignored:', schema);

  return noopMiddleware();
}
