// resolvers.ts
import type { Middleware } from './middleware';
import { keyOfName } from './path';

// 通用错误映射：把 schema error 转为 Map<jsonKey, string[]>
type ErrMap = Map<string, string[]>;

const mergeErr = (m: ErrMap, key: string, msg: string) => {
  const k = keyOfName(key);
  const arr = m.get(k) || [];
  arr.push(msg);
  m.set(k, arr);
};

export function createYupResolver(schema: any): Middleware {
  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type !== 'validateField') return next(action);
      const name = action.name;
      try {
        await schema.validate(getState(), { abortEarly: false });
        // 全通过：清掉该字段错误
        dispatch({ entries: [[keyOfName(name), []]], type: 'setExternalErrors' });
      } catch (e: any) {
        const m: ErrMap = new Map();
        (e.inner || []).forEach((err: any) => {
          if (err.path) mergeErr(m, err.path, err.message);
        });
        // 如果传了具体 name，只回该字段；否则回全量
        const entries = name ? [[keyOfName(name), m.get(keyOfName(name)) || []]] : Array.from(m.entries());
        dispatch({ entries, type: 'setExternalErrors' });
      }
    };
}

export function createZodResolver(schema: any): Middleware {
  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type !== 'validateField') return next(action);
      const name = action.name;
      const res = schema.safeParse(getState());
      if (res.success) {
        dispatch({ entries: [[keyOfName(name), []]], type: 'setExternalErrors' });
        return;
      }
      const m: ErrMap = new Map();
      res.error.errors.forEach((issue: any) => {
        const path = issue.path?.length ? issue.path.join('.') : 'root';
        mergeErr(m, path, issue.message);
      });
      const entries = name ? [[keyOfName(name), m.get(keyOfName(name)) || []]] : Array.from(m.entries());
      dispatch({ entries, type: 'setExternalErrors' });
    };
}

// async-validator 版（与 antd 同源）
export function createAsyncValidatorResolver(descriptor: any, options?: any): Middleware {
  const AsyncValidator = (descriptor as any).default ?? descriptor; // 兼容导出
  return ({ dispatch, getState }) =>
    next =>
    async action => {
      if (action.type !== 'validateField') return next(action);
      const name = action.name;
      const validator = new AsyncValidator(descriptor);
      try {
        await validator.validate(getState(), options);
        dispatch({ entries: [[keyOfName(name), []]], type: 'setExternalErrors' });
      } catch (e: any) {
        const m: ErrMap = new Map();
        (e.errors || []).forEach((it: any) => {
          const path = it.field || 'root';
          mergeErr(m, path, it.message);
        });
        const entries = name ? [[keyOfName(name), m.get(keyOfName(name)) || []]] : Array.from(m.entries());
        dispatch({ entries, type: 'setExternalErrors' });
      }
    };
}
