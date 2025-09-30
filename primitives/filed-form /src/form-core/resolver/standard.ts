/* eslint-disable consistent-return */

import { createGenericResolver } from './utils';

/**
 * The Standard Schema interface.
 */
export type StandardSchemaV1<Input = unknown, Output = Input> = {
  /**
   * The Standard Schema properties.
   */
  readonly '~standard': StandardSchemaV1Props<Input, Output>;
};

/**
 * The Standard Schema types interface.
 */
interface StandardSchemaV1Types<Input = unknown, Output = Input> {
  /**
   * The input type of the schema.
   */
  readonly input: Input;
  /**
   * The output type of the schema.
   */
  readonly output: Output;
}

/**
 * The Standard Schema properties interface.
 */
interface StandardSchemaV1Props<Input = unknown, Output = Input> {
  /**
   * Inferred types associated with the schema.
   */
  readonly types?: StandardSchemaV1Types<Input, Output> | undefined;
  /**
   * Validates unknown input values.
   */
  readonly validate: (value: unknown) => StandardSchemaV1Result<Output> | Promise<StandardSchemaV1Result<Output>>;
  /**
   * The vendor name of the schema library.
   */
  readonly vendor: string;
  /**
   * The version number of the standard.
   */
  readonly version: 1;
}

/**
 * The result interface of the validate function.
 */
type StandardSchemaV1Result<Output> = StandardSchemaV1SuccessResult<Output> | StandardSchemaV1FailureResult;
/**
 * The result interface if validation succeeds.
 */
interface StandardSchemaV1SuccessResult<Output> {
  /**
   * The non-existent issues.
   */
  readonly issues?: undefined;
  /**
   * The typed output value.
   */
  readonly value: Output;
}
/**
 * The result interface if validation fails.
 */
interface StandardSchemaV1FailureResult {
  /**
   * The issues of failed validation.
   */
  readonly issues: ReadonlyArray<StandardSchemaV1Issue>;
}

/**
 * The issue interface of the failure output.
 */
export interface StandardSchemaV1Issue {
  /**
   * The error message of the issue.
   */
  readonly message: string;
  /**
   * The path of the issue, if any.
   */
  readonly path?: ReadonlyArray<PropertyKey | StandardSchemaV1PathSegment> | undefined;
}

/**
 * Internal normalized issue type
 * 路径已经被扁平化为 string[]
 */
export interface StandardSchemaV1NormalizedIssue {
  /** 错误信息 */
  readonly message: string;
  /** 扁平化路径 */
  readonly path: readonly string[];
}
/**
 * The path segment interface of the issue.
 */
interface StandardSchemaV1PathSegment {
  /**
   * The key representing a path segment.
   */
  readonly key: PropertyKey;
}

export function isStandardSchema(obj: any): obj is StandardSchemaV1 {
  return obj && obj['~standard'] && typeof obj['~standard'].validate === 'function';
}

/**
 * Standard Schema Resolver
 * 支持 sync/async validate，同时处理 validateField 和 validateFields
 */

export function createStandardResolver<Values = any>(schema: StandardSchemaV1<Values>) {
  return createGenericResolver<Values>(async state => {
    const result = await Promise.resolve(schema['~standard'].validate(state));

    if (!('issues' in result)) return [];

    const issues = result.issues?.map(issue => {
      const path = issue.path
        ? issue.path.map(seg => (typeof seg === 'object' && 'key' in seg ? String(seg.key) : String(seg)))
        : [];
      return {
        message: issue.message,
        path
      };
    });

    return issues || [];
  });
}
