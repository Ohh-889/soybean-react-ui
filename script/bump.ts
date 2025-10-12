import fs from 'node:fs';
import path from 'node:path';

import { versionBump } from 'bumpp';
import chalk from 'chalk';

const pathName = process.argv[2]; // 如: packages/skyroc-form

if (!pathName) {
  console.error(chalk.red('❌ 必须指定子包名, 例如: pnpm release skyroc-form'));
  process.exit(1);
}

const cwd = path.resolve(pathName);
const pkgPath = path.join(cwd, 'package.json');
if (!fs.existsSync(pkgPath)) {
  console.error(chalk.red(`❌ 找不到 ${pkgPath}`));
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const current = pkg.version;

const pkgName = pkg.name;

console.log(chalk.cyan(`🔍 当前版本: ${pkgName}@${current} ${pkgName}`));

await versionBump({
  commit: `chore(${pkgName}): release v%s`,
  confirm: false,
  cwd,
  execute: async op => {
    console.log('op', op);
  },
  files: ['package.json'],
  progress(info) {
    // 打印进度事件
    console.log(`[${info.event}] ${info.newVersion ?? ''} ${info.commit ?? ''}`);
  }, // 自动分析 commit 类型
  push: false,
  release: 'conventional',
  tag: `${pkgName}@%s`
});

console.log(chalk.green(`✅ 已发布 ${pkgName}`));
