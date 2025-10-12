import type { VersionBumpOptions } from 'bumpp';
import { versionBump } from 'bumpp';

import type { CliOption, ReleaseOptions } from '../types';

export interface ArgsReleaseOptions extends ReleaseOptions {
  releaseOptions?: CliOption['releaseOptions'];
}

export async function releaseArgs(agrs: ArgsReleaseOptions) {
  const { execute = 'npx sr changelog', packageName, preid = 'beta', push = true, release, releaseOptions } = agrs;

  const defaultOptions = {
    all: true,
    commit: 'chore(projects): release v%s',
    execute,
    files: ['**/package.json', '!**/node_modules'],
    preid,
    push,
    release,
    tag: true
  };

  const cliOptions =
    typeof releaseOptions === 'function'
      ? releaseOptions({
          execute,
          packageName,
          preid,
          push,
          release
        })
      : releaseOptions;

  const options = releaseOptions ? cliOptions : defaultOptions;

  await versionBump(options as VersionBumpOptions);
}
