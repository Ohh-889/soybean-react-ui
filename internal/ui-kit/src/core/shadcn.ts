import { execSync } from 'node:child_process';

/**
 * 调用 pnpm dlx shadcn@latest <subcommand> ...args
 * 透明透传所有 shadcn 的原生命令与参数。
 */
export async function runShadcn(subcommand: string, args: string[], opts?: { cwd?: string }) {
  const finalArgs = ['dlx', 'shadcn@latest', subcommand, ...args];

  // 在 Windows / Unix 都兼容
  const child = execSync(`pnpm ${finalArgs.join(' ')}`, {
    cwd: opts?.cwd,
    stdio: 'inherit'
  });
  return child;
}
