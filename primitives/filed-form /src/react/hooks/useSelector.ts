'use client';
/* eslint-disable no-bitwise */
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { AllPathsKeys } from 'skyroc-type-utils';

import type { ChangeMask } from '../../form-core/event';
import { ChangeTag } from '../../form-core/event';

import { useFieldContext } from './FieldContext';
import type { FormInstance, InternalFormInstance } from './FieldContext';

type Eq<T> = (a: T, b: T) => boolean;

type UseSelectorOpts<Values, R> = {
  /** 订阅字段，空则订阅全部 */
  deps?: AllPathsKeys<Values>[];
  /** 是否相等 */
  eq?: Eq<R>;
  /** 表单实例 */
  form?: FormInstance<Values>;
  /** 是否订阅子路径 */
  includeChildren?: boolean;
  /** 变更掩码 */
  mask?: ChangeMask;
};

/**
 * 从表单中“选择”任意聚合值，只有依赖变化才刷新。
 */
export function useSelector<Values = any, R = unknown>(
  selector: (get: (n: AllPathsKeys<Values>) => any, all: Values) => R,
  opts?: UseSelectorOpts<Values, R>
): R {
  const ctxForm = useFieldContext<Values>();
  const form = opts?.form ?? ctxForm;

  const eq = opts?.eq ?? Object.is;

  if (!form) {
    throw new Error('Can not find FormContext. Please make sure you wrap Field under Form or provide a form instance.');
  }

  const { getInternalHooks } = form as unknown as InternalFormInstance<Values>;
  const { subscribeField } = getInternalHooks();

  const deps = opts?.deps;

  const mask = opts?.mask ?? ChangeTag.Value;
  const includeChildren = opts?.includeChildren;

  // 计算当前选择值
  const compute = () => {
    const getField = form.getFieldValue;
    const all = form.getFieldsValue() as Values;
    return selector(getField, all);
  };

  // state + ref 用于去抖渲染
  const [val, setVal] = useState<R>(compute);

  const prevRef = useRef<R>(val);

  useEffect(() => {
    // 订阅器
    const onChange = () => {
      const next = compute();
      if (!eq(prevRef.current, next)) {
        prevRef.current = next;
        // 与 useFieldState 一致：同步刷新，减少闪烁
        flushSync(() => setVal(next));
      }
    };

    // 指定字段订阅
    return subscribeField(deps, onChange, {
      includeChildren,
      mask
    });
  }, []);

  return val;
}
