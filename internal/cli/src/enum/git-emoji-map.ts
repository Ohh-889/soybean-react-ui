/**
 * Git commit emoji mapping based on Conventional Commits and Gitmoji
 * Format: [commitType, emoji]
 */
export const gitEmojiMap = [
  // 主要提交类型 (Conventional Commits)
  ['feat', '✨'], // 新功能
  ['fix', '🐛'], // 修复 bug
  ['docs', '📝'], // 文档更新
  ['style', '💄'], // 代码格式（不影响代码运行的变动）
  ['refactor', '♻️'], // 重构（既不是新增功能，也不是修改 bug 的代码变动）
  ['perf', '⚡️'], // 性能优化
  ['test', '✅'], // 测试相关
  ['build', '📦'], // 构建系统或外部依赖变动
  ['ci', '👷'], // CI 配置文件和脚本变动
  ['chore', '🔧'], // 其他不修改 src 或 test 的修改
  ['revert', '⏪'], // 回退之前的提交

  // 特殊场景
  ['init', '🎉'], // 初始化项目
  ['release', '🔖'], // 发布/版本标签
  ['hotfix', '🚑'], // 紧急修复
  ['wip', '🚧'], // 进行中的工作
  ['merge', '🔀'], // 合并分支
  ['breaking', '💥'], // 破坏性变更

  // 依赖相关
  ['deps', '📌'], // 依赖相关
  ['upgrade', '⬆️'], // 升级依赖
  ['downgrade', '⬇️'], // 降级依赖

  // 代码质量
  ['typo', '✏️'], // 修复拼写错误
  ['lint', '🎨'], // 代码格式化/Lint
  ['types', '🏷️'], // 类型定义

  // 其他常用
  ['i18n', '🌐'], // 国际化和本地化
  ['config', '🔧'], // 配置文件修改
  ['remove', '🗑️'], // 删除代码/文件
  ['move', '🚚'], // 移动/重命名文件
  ['ui', '💄'] // UI/样式更新
];
