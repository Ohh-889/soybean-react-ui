// undoRedo.ts
import { useEffect, useState } from 'react';

import type { ArrayOpAction, Middleware } from '../../form-core/middleware';
import { get as getPath } from '../../utils/get';
import type { NamePath } from '../../utils/util';
import { keyOfName } from '../../utils/util';

import type { FormInstance, InternalFormInstance } from './FieldContext';

type SetPatch = {
  name: NamePath;
  next: any;
  prev: any;
  type: 'set';
};

type ArrayPatch = ArrayOpAction & {
  inverse: ArrayOpAction;
};

type Patch = SetPatch | ArrayPatch;

export function useUndoRedo(form: FormInstance) {
  const [undoStack, setUndoStack] = useState<Patch[][]>([]);
  const [redoStack, setRedoStack] = useState<Patch[][]>([]);

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  const mw: Middleware =
    ({ getState }) =>
    next =>
    action => {
      const stateBefore = getState();
      const batch: Patch[] = [];

      switch (action.type) {
        case 'setFieldValue': {
          const k = keyOfName(action.name);
          const prev = getPath(stateBefore, k);

          batch.push({ name: k, next: action.value, prev, type: 'set' });
          break;
        }
        case 'setFieldsValue': {
          Object.entries(action.values).forEach(([k1, v]) => {
            const prev = getPath(stateBefore, k1 as any);
            batch.push({ name: keyOfName(k1), next: v, prev, type: 'set' });
          });
          break;
        }
        case 'arrayOp': {
          const { args, name } = action;

          const arr = (getPath(stateBefore, name) as any[]) ?? [];

          let inverse: any = null;

          switch (args.op) {
            case 'insert':
              inverse = { args: { index: args.index }, op: 'remove' };
              break;
            case 'remove':
              inverse = { args: { index: args.index, item: arr[args.index] }, op: 'insert' };
              break;
            case 'move':
              inverse = { args: { from: args.to, to: args.from }, op: 'move' };
              break;
            case 'swap':
              inverse = { args: { from: args.to, to: args.from }, op: 'swap' };
              break;
            case 'replace':
              inverse = { args: { index: args.index, item: arr[args.index] }, op: 'replace' };
              break;
            default:
              break;
          }

          batch.push({ args, inverse, name, type: 'arrayOp' });
          break;
        }
        default:
          break;
      }

      const ret = next(action);

      if (batch.length > 0) {
        setUndoStack(prev => [...prev, batch]);

        setRedoStack([]); // clear redo stack on new operation
      }

      return ret;
    };

  const applyBatch = (batch: Patch[], dir: 'redo' | 'undo') => {
    const context = form as InternalFormInstance;

    const { arrayOp, setFieldValue, transaction } = context.getInternalHooks();

    transaction(() => {
      const iterate = dir === 'undo' ? [...batch].reverse() : batch;
      for (const p of iterate) {
        if (p.type === 'set') {
          setFieldValue(p.name as string, dir === 'undo' ? p.prev : p.next);
        } else {
          const use = dir === 'undo' ? p.inverse : { args: p.args, op: p.args.op };

          arrayOp(p.name as string, use.args);
        }
      }
    });
  };

  const undo = () => {
    setUndoStack(prev => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      const b = copy.pop()!;
      applyBatch(b, 'undo');
      setRedoStack(r => {
        return [...r, b];
      });
      return copy;
    });
  };

  const redo = () => {
    setRedoStack(prev => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      const b = copy.pop()!;
      applyBatch(b, 'redo');

      setUndoStack(u => {
        return [...u, b];
      });
      return copy;
    });
  };

  useEffect(() => {
    form.use(mw);
  }, []);

  return { canRedo, canUndo, redo, undo };
}
