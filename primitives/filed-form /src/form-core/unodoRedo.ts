// undoRedo.ts
import type { Middleware } from './middleware';
import { keyOfName } from './path';
import { get as getPath, set as setPath } from './utils';

type Patch =
  | { key: string; next: any; prev: any; type: 'set' }
  | { args: any; inverse: any; name: string; op: string; type: 'array' };

export function createUndoRedo(form: any) {
  const undoStack: Patch[][] = [];
  const redoStack: Patch[][] = [];
  let currentBatch: Patch[] | null = null;

  const begin = () => {
    currentBatch = [];
  };
  const commit = () => {
    if (currentBatch && currentBatch.length) {
      undoStack.push(currentBatch);
      redoStack.length = 0;
    }
    currentBatch = null;
  };

  const mw: Middleware =
    ({ getState }) =>
    next =>
    action => {
      const stateBefore = getState();
      if (!currentBatch) begin(); // 单动作也当作一个批次
      switch (action.type) {
        case 'updateValue': {
          const k = keyOfName(action.name);
          const prev = getPath(stateBefore, action.name);
          currentBatch!.push({ key: k, next: action.value, prev, type: 'set' });
          break;
        }
        case 'setFieldsValue': {
          const v = action.values;
          // 记录受影响 key 的 prev/next（简单做法：平摊若干 set）
          Object.keys(v).forEach(k1 => {
            const k = keyOfName(k1);
            const prev = getPath(stateBefore, k1 as any);
            currentBatch!.push({ key: k, next: (v as any)[k1], prev, type: 'set' });
          });
          break;
        }
        case 'arrayOp': {
          const { args, name, op } = action as any;
          // 计算逆操作
          let inverse: any = null;
          if (op === 'insert') inverse = { args: { index: args.index }, op: 'remove' };
          if (op === 'remove')
            inverse = { args: { index: args.index, item: getState()?.[name]?.[args.index] }, op: 'insert' };
          if (op === 'move') inverse = { args: { from: args.to, to: args.from }, op: 'move' };
          if (op === 'swap') inverse = { args: { i: args.j, j: args.i }, op: 'swap' };
          if (op === 'replace')
            inverse = { args: { index: args.index, item: getPath(stateBefore, name)[args.index] }, op: 'replace' };
          currentBatch!.push({ args, inverse, name, op, type: 'array' });
          break;
        }
      }
      const ret = next(action);
      commit();
      return ret;
    };

  const applyBatch = (batch: Patch[], dir: 'redo' | 'undo') => {
    form.begin();
    try {
      for (let i = batch.length - 1; i >= 0; i--) {
        const p = batch[i];
        if (p.type === 'set') {
          form.setFieldValue(JSON.parse(p.key), dir === 'undo' ? p.prev : p.next);
        } else {
          const use = dir === 'undo' ? p.inverse : { args: p.args, op: p.op };
          form.arrayOp(p.name, use.op, use.args);
        }
      }
    } finally {
      form.commit();
    }
  };

  const undo = () => {
    const b = undoStack.pop();
    if (b) {
      applyBatch(b, 'undo');
      redoStack.push(b);
    }
  };
  const redo = () => {
    const b = redoStack.pop();
    if (b) {
      applyBatch(b, 'redo');
      undoStack.push(b);
    }
  };

  form.use(mw);

  return {
    canRedo: () => redoStack.length > 0,
    canUndo: () => undoStack.length > 0,
    redo,
    undo
  };
}
