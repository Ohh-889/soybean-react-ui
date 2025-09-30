/**
 * Form schema resolver module
 * Provides functionality to resolve different types of form schemas into middleware
 */

import type { Middleware } from '../middleware';

import type { StandardSchemaV1, StandardSchemaV1NormalizedIssue } from './standard';
import { createStandardResolver, isStandardSchema } from './standard';
import { createGenericResolver } from './utils';

/**
 * Union type representing supported form schema types
 */
export type FormSchema<Values = any> =
  | StandardSchemaV1<Values> // Standard schema v1 implementation
  | ((state: Values, name: string | string[] | undefined) => Promise<StandardSchemaV1NormalizedIssue[]>); // Custom validation function

/**
 * Creates a no-operation middleware that passes through all actions unchanged
 * Used as a fallback when schema resolution fails
 */
function noopMiddleware<Values = any>(): Middleware<Values> {
  return () => next => action => next(action);
}

/**
 * Resolves a form schema into appropriate middleware based on its type
 * Supports StandardSchemaV1 and custom validation functions
 */
export function resolveSchema<Values = any>(schema: FormSchema<Values>): Middleware<Values> {
  // Check if schema follows StandardSchemaV1 interface
  if (isStandardSchema(schema)) {
    return createStandardResolver(schema);
  }

  // Check if schema is a custom validation function
  if (typeof schema === 'function') {
    return createGenericResolver(schema);
  }

  // Log warning for unsupported schema types
  console.warn('[resolveSchema] Unsupported schema type, ignored:', schema);

  // Return no-op middleware as fallback
  return noopMiddleware();
}
