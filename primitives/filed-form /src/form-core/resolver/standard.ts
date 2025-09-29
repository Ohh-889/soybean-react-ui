/* eslint-disable consistent-return */
import type { AllPathsKeys } from 'skyroc-type-utils';

import { keyOfName } from '../../utils/util';
import type { Middleware } from '../middleware';

import { dispatchIssues } from './utils';

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

function isStandardSchema(obj: any): obj is StandardSchemaV1 {
  return obj && obj['~standard'] && typeof obj['~standard'].validate === 'function';
}

/**
 * Standard Schema Resolver
 * 支持 sync/async validate，同时处理 validateField 和 validateFields
 */
export function createStandardResolver<Values = any>(
  schema: StandardSchemaV1<Values, unknown>
): Middleware<Values, AllPathsKeys<Values>> {
  if (!isStandardSchema(schema)) {
    throw new Error('Invalid StandardSchema object');
  }

  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type !== 'validateField' && action.type !== 'validateFields') {
        return next(action);
      }

      const state = getState();
      const result = await Promise.resolve(schema['~standard'].validate(state));

      console.log('result', result);

      if (!('issues' in result)) {
        // ✅ 没有错误，清空所有
        dispatch({ entries: [], type: 'setExternalErrors' });
        return;
      }

      // 把 issues 转成统一格式
      const issues: StandardSchemaV1NormalizedIssue[] =
        result.issues?.map(issue => ({
          message: issue.message,
          path: issue.path?.map(seg => (typeof seg === 'object' && 'key' in seg ? String(seg.key) : String(seg))) || []
        })) || [];

      // === validateField ===
      if (action.type === 'validateField') {
        const name = keyOfName(action.name);

        const filtered = issues.filter(it => it.path?.join('.') === name || (it.path?.length === 0 && name === 'root'));

        dispatchIssues<Values>(dispatch, filtered);
        return;
      }

      // === validateFields ===
      if (action.type === 'validateFields') {
        dispatchIssues<Values>(dispatch, issues);
      }
    };
}
