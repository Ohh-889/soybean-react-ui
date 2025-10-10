// .github/version-script-beta.js
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const pkgName = process.argv[2];
if (!pkgName) {
  console.error('❌ Missing package argument. Usage: node .github/version-script-beta.js <package-name>');
  process.exit(1);
}

const pkgPath = `packages/${pkgName}/package.json`;

try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const shortHash = execSync('git rev-parse --short HEAD').toString().trim();
  pkg.version = `0.0.0-beta.${shortHash}`;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log(`✅ Updated ${pkgName} version → ${pkg.version}`);
} catch (err) {
  console.error('Error modifying version:', err);
  process.exit(1);
}
