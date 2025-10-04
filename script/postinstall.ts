import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.env.INIT_CWD || process.cwd();
const pkgPath = path.join(cwd, 'package.json');

if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  console.log('process.env.npm_package_name', process.env.npm_package_name);

  console.log(`🔥 postinstall running for package: ${pkg.name}`);

  execSync(`pnpm --filter ${pkg.name} run lint:pkg`, {
    cwd,
    // 指定子包 cwd，避免跑到 root
    stdio: 'inherit'
  });
} else {
  console.log('⚠️ no package.json found in INIT_CWD', cwd);
}
