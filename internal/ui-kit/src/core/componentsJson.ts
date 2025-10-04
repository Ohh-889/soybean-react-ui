import { pathExists, readJSON, writeJSON } from 'fs-extra';
import { join } from 'pathe';

import type { ComponentsJson } from '../types';

export async function readComponentsJson(cwd: string) {
  const file = join(cwd, 'components.json');
  if (!(await pathExists(file))) return null;
  return (await readJSON(file)) as ComponentsJson;
}

export async function writeComponentsJson(cwd: string, data: ComponentsJson) {
  const file = join(cwd, 'components.json');
  await writeJSON(file, data, { spaces: 2 });
}

export function deepMerge<T extends object>(a: T, b: Partial<T>): T {
  const out: any = Array.isArray(a) ? [...a] : { ...a };
  for (const [k, v] of Object.entries(b as any)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      (out as any)[k] = deepMerge((out as any)[k] ?? {}, v);
    } else if (v !== undefined) {
      (out as any)[k] = v;
    }
  }
  return out;
}

/** 生成你的默认 components.json（按你的需求） */
export function defaultComponentsJson(): ComponentsJson {
  return {
    $schema: 'https://ui.shadcn.com/schema.json',
    aliases: {
      components: '@/components',
      hooks: '@/hooks',
      lib: '@/lib',
      ui: '@/components/ui',
      utils: '@/lib/utils'
    },
    iconLibrary: 'lucide',
    // 你的私有/自定义注册表
    registries: {
      '@sr': 'http://localhost:3001/r/{name}.json'
    },
    rsc: true,
    style: 'new-york',
    tailwind: {
      baseColor: 'neutral',
      config: '',
      css: 'app/globals.css',
      cssVariables: true,
      prefix: ''
    },
    tsx: true
  };
}

/**
 * 规范化：根据 wrapper 传入的 --css-variables/--no-css-variables，落到 tailwind.cssVariables
 * 注意：wrapper 默认二者都 false（即不改变已有配置），只有显式传入才改。
 */
export function applyCssVariablesFlag(
  json: ComponentsJson,
  flags: { cssVariables?: boolean; noCssVariables?: boolean }
) {
  if (flags.cssVariables) {
    json.tailwind ??= {};
    json.tailwind.cssVariables = true;
  } else if (flags.noCssVariables) {
    json.tailwind ??= {};
    json.tailwind.cssVariables = false;
  }
}
