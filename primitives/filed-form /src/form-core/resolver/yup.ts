import { type Issue, createGenericResolver } from './utils';

export function createYupResolver(schema: any) {
  return createGenericResolver(async (state, name): Promise<Issue[]> => {
    try {
      if (name) {
        await schema.validateAt(name, state);
        return []; // 单字段通过
      }
      await schema.validate(state, { abortEarly: false });
      return []; // 全部通过
    } catch (e: any) {
      return (e.inner || []).map((err: any) => ({
        message: err.message,
        path: err.path || 'root'
      }));
    }
  });
}
