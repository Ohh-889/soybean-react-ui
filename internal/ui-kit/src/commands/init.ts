import {
  applyCssVariablesFlag,
  deepMerge,
  defaultComponentsJson,
  readComponentsJson,
  writeComponentsJson
} from '../core/componentsJson';
import { log } from '../core/logger';
import type { ComponentsJson } from '../types';

/**
 * soyui init
 * - 若不存在 components.json：写入默认模板
 * - 若存在：合并（保留用户已有设置），可通过 flags 更新 tailwind.cssVariables / baseColor / style / prefix 等
 */
export async function cmdInit(
  cwd: string,
  flags: {
    // --no-css-variables
    baseColor?: string;
    cssVariables?: boolean; // --css-variables
    noCssVariables?: boolean; // --style new-york|...
    prefix?: string; // --tsx / --no-tsx
    registry?: string; // --prefix tw-
    rsc?: boolean; // --base-color neutral|zinc|slate...
    style?: string; // --rsc / --no-rsc 用 commander 处理
    tsx?: boolean; // --registry 用于覆盖 @sr
  }
) {
  const current = (await readComponentsJson(cwd)) ?? defaultComponentsJson();

  // 合并覆盖
  const overrides: Partial<ComponentsJson> = {};
  if (flags.style !== undefined) overrides.style = flags.style;
  if (flags.rsc !== undefined) overrides.rsc = flags.rsc;
  if (flags.tsx !== undefined) overrides.tsx = flags.tsx;
  if (flags.baseColor !== undefined || flags.prefix !== undefined) {
    overrides.tailwind = {
      ...(overrides.tailwind || current.tailwind || {}),
      ...(flags.baseColor ? { baseColor: flags.baseColor } : {}),
      ...(flags.prefix !== undefined ? { prefix: flags.prefix } : {})
    };
  }
  if (flags.registry) {
    overrides.registries = {
      ...(current.registries || {}),
      '@sr': flags.registry
    };
  }

  const next = deepMerge(current, overrides);
  applyCssVariablesFlag(next, { cssVariables: flags.cssVariables, noCssVariables: flags.noCssVariables });

  await writeComponentsJson(cwd, next);
  log.ok('components.json 已更新/创建');
}
