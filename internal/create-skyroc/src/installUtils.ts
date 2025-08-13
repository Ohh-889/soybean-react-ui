import { relative } from 'node:path';

import { consola } from 'consola';
import spawn from 'cross-spawn';
import { cyan, green, yellow } from 'kolorist';
import ora from 'ora';

export type PMName = 'bun' | 'cnpm' | 'npm' | 'pnpm' | 'yarn';

function getInstallArgs(pm: PMName) {
  if (pm === 'yarn') return [];
  if (pm === 'bun') return ['install'];
  if (pm === 'pnpm') return ['install'];
  return ['install'];
}

export async function installDeps(root: string, pm: PMName): Promise<number> {
  const cmd = pm;

  const args = getInstallArgs(pm);

  const spinner = ora(`Installing dependencies with ${pm}...`).start();

  const child = spawn(cmd, args, {
    cwd: root,
    shell: process.platform === 'win32',
    stdio: 'inherit'
  });

  return await new Promise(resolve => {
    child.on('close', code => {
      if (code === 0) {
        spinner.succeed('Dependencies installed.');
      } else {
        spinner.fail(`Install failed with exit code ${code}.`);
      }
      resolve(code ?? 1);
    });
  });
}

export function printNextSteps(root: string, pm: PMName, projectName: string) {
  const cd = relative(process.cwd(), root);

  consola.info(`\n${cyan('Done. Now run:')}`);

  if (cd && cd !== '') {
    consola.info(`  ${green('cd')} ${cd.includes(' ') ? `"${cd}"` : cd}`);
  }

  if (pm === 'yarn') {
    consola.info(`  ${green('yarn')}`);
    consola.info(`  ${green('yarn dev')}`);
  } else if (pm === 'bun') {
    consola.info(`  ${green('bun install')}`);
    consola.info(`  ${green('bun dev')}`);
  } else if (pm === 'pnpm') {
    consola.info(`  ${green('pnpm install')}`);
    consola.info(`  ${green('pnpm dev')}`);
  } else {
    consola.info(`  ${green('npm install')}`);
    consola.info(`  ${green('npm run dev')}`);
  }

  consola.start(`\n${yellow(`Happy hacking, ${projectName}! ✨`)}`);
}

function getArgs(pm: PMName) {
  if (pm === 'yarn') return ['dev'];

  if (pm === 'bun') return ['run', 'dev'];

  if (pm === 'pnpm') return ['dev'];

  return ['dev'];
}

export async function runDev(root: string, pm: PMName) {
  const args = getArgs(pm);

  consola.start(`Starting dev server with ${pm}...`);

  spawn(pm, args, { cwd: root, shell: process.platform === 'win32', stdio: 'inherit' });
}
