import { type Issue, createGenericResolver } from './utils';

export function createZodResolver(schema: any) {
  return createGenericResolver(async (state): Promise<Issue[]> => {
    const res = schema.safeParse(state);

    if (res.success) return [];

    return res.error.issues.map((issue: any) => ({
      message: issue.message,
      path: issue.path?.length ? issue.path.join('.') : 'root'
    }));
  });
}
