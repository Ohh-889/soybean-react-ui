#!/usr/bin/env node

import { Command } from 'commander';
import { resolve } from 'pathe';

import { cmdAdd } from './commands/add';
import { cmdInit } from './commands/init';
import { log } from './core/logger';
import { runShadcn } from './core/shadcn';

console.log('ui-kit CLI running...');

const program = new Command();
program.name('soyui').description('Soybean React UI wrapper CLI for shadcn.').version('0.1.0').allowUnknownOption(true); // 允许未知选项，以便透传到底层 shadcn

const cwdOpt = (cmd: Command) => cmd.option('-c, --cwd <cwd>', 'working directory', process.cwd());

// ====== init ======
cwdOpt(
  program
    .command('init')
    .description('initialize or update components.json before using shadcn')
    // wrapper 自己接管的开关（默认都 false：不修改已有配置）
    .option('--css-variables', 'enable CSS variables in components.json', false)
    .option('--no-css-variables', 'disable CSS variables in components.json', false)
    .option('--style <style>', 'style name (e.g. new-york)')
    .option('--base-color <color>', 'baseColor for tailwind (e.g. neutral|zinc|slate)')
    .option('--prefix <prefix>', 'tailwind class prefix (e.g. tw-)')
    .option('--rsc', 'enable React Server Components', undefined)
    .option('--no-rsc', 'disable React Server Components', undefined)
    .option('--tsx', 'enable tsx mode', undefined)
    .option('--no-tsx', 'disable tsx mode', undefined)
    .option('--registry <url>', 'override @sr registry url')
).action(async opts => {
  const cwd = resolve(opts.cwd);
  await cmdInit(cwd, {
    baseColor: opts.baseColor,
    cssVariables: Boolean(opts.cssVariables),
    noCssVariables: Boolean(opts.noCssVariables),
    prefix: opts.prefix,
    registry: opts.registry,
    rsc: typeof opts.rsc === 'boolean' ? opts.rsc : undefined,
    style: opts.style,
    tsx: typeof opts.tsx === 'boolean' ? opts.tsx : undefined
  });

  // commander 原始 argv 获取
  const argv = process.argv.slice(2);
  const idxInit = argv.indexOf('init');
  const passthrough = idxInit >= 0 ? argv.slice(idxInit + 1) : [];

  // 去掉 wrapper 已消费的自定义 flag
  const stripFlags = new Set([
    '--css-variables',
    '--no-css-variables',
    '--style',
    '--base-color',
    '--prefix',
    '--rsc',
    '--no-rsc',
    '--tsx',
    '--no-tsx',
    '--registry',
    '--cwd'
  ]);
  const finalArgs = passthrough.filter(a => !stripFlags.has(a) && !a.startsWith('--cwd'));

  finalArgs.push('@sr/example-style');

  await runShadcn('add', finalArgs, { cwd });
});

// ====== add ======
cwdOpt(
  program
    .command('add [components...]')
    .description('add components via shadcn with pre-init hook')
    // wrapper 识别的两个标志（默认 false，不动已有配置）
    .option('--css-variables', 'enable CSS variables in components.json', false)
    .option('--no-css-variables', 'disable CSS variables in components.json', false)
  // 以下都不解析，全部透传给 shadcn：-y/-o/-p/-s/--all/--path/--src-dir/--no-src-dir 等
)
  .allowExcessArguments(true)
  .action(async (components, opts) => {
    const cwd = resolve(opts.cwd ?? process.cwd());

    // 取出“未知参数”（commander 没定义的都在这里），用于完整透传
    // 注意：commander 把已知选项解析掉，剩余原样在 command.parent?.args 中
    const argv = process.argv.slice(2);
    const idxAdd = argv.indexOf('add');
    const passthrough = idxAdd >= 0 ? argv.slice(idxAdd + 1) : [];
    // 去掉 wrapper 已处理过的自定义 flag，避免重复传给 shadcn
    const stripFlags = new Set(['--css-variables', '--no-css-variables', '--cwd']);
    const finalPassthrough = passthrough.filter(a => !stripFlags.has(a) && !a.startsWith('--cwd'));

    await cmdAdd(cwd, components, {
      cssVariables: Boolean(opts.cssVariables),
      noCssVariables: Boolean(opts.noCssVariables),
      passthrough: finalPassthrough
    });
  });

// ====== raw（可选：手动全量透传到 shadcn） ======
cwdOpt(program.command('raw [args...]').description('run shadcn with raw args (escape hatch)')).action(
  async (args: string[], opts) => {
    const { runShadcn } = await import('./core/shadcn.js');
    const sub = args && args.length > 0 ? String(args[0]) : 'help';
    const rest = args.slice(1);
    await runShadcn(sub, rest, { cwd: resolve(opts.cwd ?? process.cwd()) });
  }
);

program.parseAsync(process.argv).catch(e => {
  log.err(String(e?.stack || e?.message || e));
  process.exit(1);
});
