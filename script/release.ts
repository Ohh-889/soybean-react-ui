import { execSync } from 'node:child_process';

/**
 * Release type for different version publishing scenarios
 * - prod: Production release (stable version)
 * - beta/alpha/rc: Pre-release versions for testing
 */
type ReleaseType = 'alpha' | 'beta' | 'prod' | 'rc';

/**
 * Get default configuration for each release type
 * @param type - The release type (prod, beta, alpha, rc)
 * @returns Default configuration including preid and release strategy
 */
function getDefaultConfig(type: ReleaseType) {
  const configs = {
    alpha: { preid: 'alpha', release: 'prerelease' },
    beta: { preid: 'beta', release: 'prerelease' },
    prod: { preid: undefined, release: 'patch' },
    rc: { preid: 'rc', release: 'prerelease' }
  };

  return configs[type];
}

/**
 * Parse command line arguments
 * @returns Parsed arguments as key-value pairs
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result: Record<string, string | undefined> = {
    push: 'true'
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if ((arg === '--type' || arg === '-t') && args[i + 1]) {
      result.type = args[i + 1];
      i += 1;
    } else if ((arg === '--path' || arg === '--packageName' || arg === '-p') && args[i + 1]) {
      result.packageName = args[i + 1];
      i += 1;
    } else if ((arg === '--release' || arg === '-r') && args[i + 1]) {
      result.release = args[i + 1];
      i += 1;
    } else if ((arg === '--preid' || arg === '-pr') && args[i + 1]) {
      result.preid = args[i + 1];
      i += 1;
    } else if (arg === '--push' && args[i + 1]) {
      result.push = args[i + 1];
      i += 1;
    } else if (arg === '--no-push') {
      result.push = 'false';
    }
  }

  return result;
}

const options = parseArgs();

// Validate type parameter - must be one of: prod, beta, alpha, rc
if (!options.type || !['prod', 'beta', 'alpha', 'rc'].includes(options.type)) {
  // eslint-disable-next-line no-console
  console.error('❌ Release type is required: --type prod|beta|alpha|rc');
  process.exit(1);
}

const type = options.type as ReleaseType;
const defaultConfig = getDefaultConfig(type);

// Build the command with appropriate arguments
const cmdParts = ['sr', 'release'];

if (options.packageName) {
  cmdParts.push('--packageName', options.packageName);
}

// Use user-specified parameters if provided, otherwise use default values
const release = options.release || defaultConfig.release;
cmdParts.push('--release', release);

// Only pre-release versions need preid (beta, alpha, rc)
const preid = options.preid || defaultConfig.preid;
if (preid) {
  cmdParts.push('--preid', preid);
}

if (options.push === 'true') {
  cmdParts.push('--push');
}

const cmd = cmdParts.join(' ');

// eslint-disable-next-line no-console
console.log(`🚀 Executing command: ${cmd}`);

execSync(cmd, {
  stdio: 'inherit'
});
