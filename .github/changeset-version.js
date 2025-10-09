// .github/changeset-version.js
import { execSync } from 'node:child_process';

try {
  console.log('🔢 Running changeset version...');
  execSync('pnpm changeset version', { stdio: 'inherit' });

  console.log('📦 Updating lockfile...');
  execSync('pnpm install --lockfile-only', { stdio: 'inherit' });

  console.log('✅ Versioning completed successfully.');
} catch (err) {
  console.error('❌ Error while running version update:', err);
  process.exit(1);
}
