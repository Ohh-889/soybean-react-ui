import {
  applyCssVariablesFlag,
  defaultComponentsJson,
  readComponentsJson,
  writeComponentsJson
} from '../core/componentsJson';
import { log } from '../core/logger';
import { runShadcn } from '../core/shadcn';

/**
 * soyui add [components...]  —— 包装 shadcn add
 * 在调用前确保 components.json 存在，并按 flags 修正 cssVariables。
 * 其余未知参数全部透传给 shadcn。
 */
export async function cmdAdd(
  cwd: string,
  components: string[],
  opts: {
    // 我们识别的 wrapper 级选项（默认 false = 不改变）
    cssVariables?: boolean;
    noCssVariables?: boolean;

    // 透传给 shadcn 的原生选项（-y/-o/-p/...）以及未知项
    passthrough: string[];
  }
) {
  // 1) 确保 components.json 存在
  const json = (await readComponentsJson(cwd)) ?? defaultComponentsJson();

  // 2) 应用 wrapper 对 cssVariables 的覆盖（仅显式传入时才应用）
  applyCssVariablesFlag(json, { cssVariables: opts.cssVariables, noCssVariables: opts.noCssVariables });

  // 3) 写回（保证 shadcn 运行时能通过 components.json 读取到）
  await writeComponentsJson(cwd, json);
  log.ok('已准备 components.json，开始执行 shadcn add ...');

  // 4) 组织最终参数：components + 剩余未知参数（全部透传）
  const finalArgs = [...components, ...opts.passthrough];

  // 5) 调用 shadcn add
  await runShadcn('add', finalArgs, { cwd });
}
