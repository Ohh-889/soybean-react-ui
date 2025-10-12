/**
 * Git commit emoji mapping based on Conventional Commits and Gitmoji
 */

export type GitEmojiItem = readonly [type: string, emoji: string];

export const gitEmojiMap = [
  // Main commit types (Conventional Commits)
  ['feat', '✨'], // New features
  ['fix', '🐛'], // Bug fixes
  ['docs', '📝'], // Documentation updates
  ['style', '💄'], // Code formatting (changes that do not affect code execution)
  ['refactor', '♻️'], // Refactoring (code changes that neither add features nor fix bugs)
  ['perf', '⚡️'], // Performance improvements
  ['test', '✅'], // Testing related
  ['build', '📦'], // Build system or external dependency changes
  ['ci', '👷'], // CI configuration and script changes
  ['chore', '🔧'], // Other changes that don't modify src or test files
  ['revert', '⏪'], // Revert previous commits

  // Special scenarios
  ['init', '🎉'], // Initialize project
  ['release', '🔖'], // Release/version tags
  ['hotfix', '🚑'], // Critical hotfix
  ['wip', '🚧'], // Work in progress
  ['merge', '🔀'], // Merge branches
  ['breaking', '💥'], // Breaking changes

  // Dependency related
  ['deps', '📌'], // Dependency related
  ['upgrade', '⬆️'], // Upgrade dependencies
  ['downgrade', '⬇️'], // Downgrade dependencies

  // Code quality
  ['typo', '✏️'], // Fix typos
  ['lint', '🎨'], // Code formatting/Lint
  ['types', '🏷️'], // Type definitions

  // Other common types
  ['i18n', '🌐'], // Internationalization and localization
  ['config', '🔧'], // Configuration file changes
  ['remove', '🗑️'], // Remove code/files
  ['move', '🚚'], // Move/rename files
  ['ui', '💄'] // UI/style updates
] as const satisfies readonly GitEmojiItem[];
