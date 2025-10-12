import type { ChangelogOption } from '@soybeanjs/changelog';

/**
 * Git commit type item [type, description]
 */
export type GitCommitType = readonly [type: string, description: string];

/**
 * Git commit scope item [scope, description]
 */
export type GitCommitScope = readonly [scope: string, description: string];

/**
 * Git emoji item [type, emoji]
 */
export type GitEmojiItem = readonly [type: string, emoji: string];

export interface CliOption {
  /**
   * Options of generate changelog
   *
   * @link https://github.com/soybeanjs/changelog
   */
  changelogOptions: Partial<ChangelogOption>;
  /**
   * Cleanup dirs
   *
   * Glob pattern syntax {@link https://github.com/isaacs/minimatch}
   *
   * @default
   * ```json
   * ["** /dist", "** /pnpm-lock.yaml", "** /node_modules", "!node_modules/**"]
   * ```
   */
  cleanupDirs: string[];
  /** The project root directory */
  cwd: string;
  /**
   * Custom git commit scopes
   *
   * If not set, will use default scopes
   */
  gitCommitScopes?: GitCommitScope[];
  /**
   * Custom git commit types
   *
   * If not set, will use default types from locale
   */
  gitCommitTypes?: GitCommitType[];
  /** The ignore pattern list of git commit verify */
  gitCommitVerifyIgnores: RegExp[];
  /**
   * Npm-check-updates command args
   *
   * @default ['--deep', '-u']
   */
  ncuCommandArgs: string[];
}
