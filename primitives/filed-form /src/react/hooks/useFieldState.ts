'use client';

/* eslint-disable react/hook-use-state */
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import type { AllPathsKeys, PathToDeepType } from 'skyroc-type-utils';
import { isArray, isNil, isObject } from 'skyroc-utils';

import type { SubscribeMaskOptions } from '../../form-core/event';
import { toMask } from '../../form-core/event';
import type { Meta } from '../../types/shared-types';
import { get } from '../../utils/get';

import type { FormInstance, InternalFormInstance, MetaShapeFromPaths } from './FieldContext';
import { useFieldContext } from './FieldContext';

type UseFormFieldsStateOpts<Values> = {
  form?: FormInstance<Values>;
  includeChildren?: boolean;
  mask?: SubscribeMaskOptions;
};

function useFieldState<Values = any, T extends AllPathsKeys<Values> = AllPathsKeys<Values>>(
  names: T,
  opts?: UseFormFieldsStateOpts<Values>
): Meta<T, PathToDeepType<Values, T>>;

function useFieldState<Values = any, T extends AllPathsKeys<Values> = AllPathsKeys<Values>>(
  names: T[],
  opts?: UseFormFieldsStateOpts<Values>
): MetaShapeFromPaths<Values, T[]>;

// 无参数：全量嵌套对象
function useFieldState<Values = any>(): MetaShapeFromPaths<Values, []>;

// form 参数：全量嵌套对象
function useFieldState<Values = any>(form: FormInstance<Values>): MetaShapeFromPaths<Values, []>;

function useFieldState<Values = any>(
  names?: AllPathsKeys<Values> | AllPathsKeys<Values>[] | FormInstance<Values>,
  opts?: UseFormFieldsStateOpts<Values>
) {
  const context = useFieldContext<Values>();

  const isFormInstance = isObject(names) && 'getFields' in names;

  const form = isFormInstance ? names : (opts?.form ?? context); // 优先外部传入，否则走 context

  if (!form) {
    throw new Error('Can not find FormContext. Please make sure you wrap Field under Form or provide a form instance.');
  }

  let subscribeNames: AllPathsKeys<Values>[] | undefined;

  if (isFormInstance) {
    // 外部传 form → 订阅全部
    subscribeNames = undefined;
  } else if (isNil(names)) {
    // 未传 names → 订阅全部
    subscribeNames = undefined;
  } else if (isArray(names)) {
    // 多字段
    subscribeNames = names;
  } else {
    // 单字段
    subscribeNames = [names];
  }

  const { getInternalHooks } = form as unknown as InternalFormInstance<Values>;

  const { subscribeField } = getInternalHooks();

  const state = form.getFields(subscribeNames);

  const mask = opts?.mask ?? {
    errors: true,
    touched: true,
    validated: true,
    validating: true,
    warnings: true
  };

  const includeChildren = opts?.includeChildren ?? isFormInstance;

  const [_, forceUpdate] = useState({});

  useEffect(() => {
    const unregister = subscribeField(
      subscribeNames,
      () => {
        flushSync(() => forceUpdate({}));
      },
      {
        includeChildren,
        mask: toMask(mask)
      }
    );
    return unregister;
  }, []);

  if (!subscribeNames) {
    // names 为空 → 返回 Map 形式
    return state;
  }
  if (subscribeNames.length === 1) {
    // 单字段 → 直接返回该字段的 meta
    return get(state, subscribeNames[0]);
  }
  // 多字段 → 返回对象
  return state;
}

export { useFieldState };
