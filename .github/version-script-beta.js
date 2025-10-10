// .github/version-script-beta.js
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const pkgPath = process.argv[2];
if (!pkgPath) {
  console.error('❌ Missing package path. Usage: node .github/version-script-beta.js <package-path>');
  process.exit(1);
}

const absPath = path.resolve(pkgPath, 'package.json');

try {
  const pkg = JSON.parse(fs.readFileSync(absPath, 'utf-8'));
  const shortHash = execSync('git rev-parse --short HEAD').toString().trim();
  pkg.version = `0.0.0-beta.${shortHash}`;
  fs.writeFileSync(absPath, JSON.stringify(pkg, null, 2));
  console.log(`✅ Updated ${pkg.name} version → ${pkg.version}`);
} catch (err) {
  console.error('❌ Error modifying version:', err);
  process.exit(1);
}
