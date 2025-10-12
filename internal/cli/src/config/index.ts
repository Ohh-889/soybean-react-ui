import process from 'node:process';

import { loadConfig } from 'c12';

import type { CliOption } from '../types';

const defaultOptions: CliOption = {
  changelogOptions: {},
  cleanupDirs: [
    '**/dist',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
    '**/node_modules',
    '!node_modules/**'
  ],
  cwd: process.cwd(),
  gitCommitVerifyIgnores: [
    /^((Merge pull request)|(Merge (.*?) into (.*?)|(Merge branch (.*?)))(?:\r?\n)*$)/m,
    /^(Merge tag (.*?))(?:\r?\n)*$/m,
    /^(R|r)evert (.*)/,
    /^(amend|fixup|squash)!/,
    /^(Merged (.*?)(in|into) (.*)|Merged PR (.*): (.*))/,
    /^Merge remote-tracking branch(\s*)(.*)/,
    /^Automatic merge(.*)/,
    /^Auto-merged (.*?) into (.*)/
  ],
  ncuCommandArgs: ['--deep', '-u'],
  releaseOptions: {}
};

export async function loadCliOptions(overrides?: Partial<CliOption>, cwd = process.cwd()) {
  const { config } = await loadConfig<Partial<CliOption>>({
    cwd,
    defaults: defaultOptions,
    name: 'skyroc',
    overrides,
    packageJson: false
  });

  return config as CliOption;
}
