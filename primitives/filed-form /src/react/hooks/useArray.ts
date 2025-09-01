// useArrayField.ts
'use client';
import { useFieldContext } from './FieldContext';
import type { NamePath } from './types';

export function useArrayField(name: NamePath) {
  const form = useFieldContext();
  return {
    insert: (index: number, item: any) => form.arrayOp(name, 'insert', { index, item }),
    move: (from: number, to: number) => form.arrayOp(name, 'move', { from, to }),
    remove: (index: number) => form.arrayOp(name, 'remove', { index }),
    replace: (index: number, item: any) => form.arrayOp(name, 'replace', { index, item }),
    swap: (i: number, j: number) => form.arrayOp(name, 'swap', { i, j })
  };
}
// 只在 value/validating 变化时刷新
const meta = useFieldState(['user', 'name'], ChangeTag.Value | ChangeTag.Validating);

// 选择器订阅：多个字段聚合 + 自定义比较
const fullName = useSelector(
  get => `${get(['user', 'first']) || ''} ${get(['user', 'last']) || ''}`,
  (a, b) => a === b,
  {
    mask: ChangeTag.Value,
    names: [
      ['user', 'first'],
      ['user', 'last']
    ]
  }
);
// 只在 value/validating 变化时刷新
const meta = useFieldState(['user', 'name'], ChangeTag.Value | ChangeTag.Validating);

// 选择器订阅：多个字段聚合 + 自定义比较
const fullName = useSelector(
  get => `${get(['user', 'first']) || ''} ${get(['user', 'last']) || ''}`,
  (a, b) => a === b,
  {
    mask: ChangeTag.Value,
    names: [
      ['user', 'first'],
      ['user', 'last']
    ]
  }
);
