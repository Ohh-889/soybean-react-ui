import { bgRed, green, red, yellow } from 'kolorist';

import { gitEmojiMap } from '../enum/git-emoji-map';
import type { GitCommitScope, GitCommitType, GitEmojiItem } from '../types';

export type Lang = 'en-us' | 'zh-cn';

interface LocaleMessages {
  description: string;
  gitEmoji: string;
  scopes: string;
  types: string;
}

interface LocaleConfig {
  gitCommitMessages: LocaleMessages;
  gitCommitScopes: readonly GitCommitScope[];
  gitCommitTypes: readonly GitCommitType[];
  gitCommitVerify: string;
  gitEmojiMap: readonly GitEmojiItem[];
}

export const locales: Record<Lang, LocaleConfig> = {
  'en-us': {
    gitCommitMessages: {
      description: `Please enter a description (add prefix ${yellow('!')} to indicate breaking change)`,
      gitEmoji: 'Please select a emoji',
      scopes: 'Please select a scope',
      types: 'Please select a type'
    },
    gitCommitScopes: [
      ['projects', 'project'],
      ['packages', 'packages'],
      ['components', 'components'],
      ['hooks', 'hook functions'],
      ['utils', 'utils functions'],
      ['types', 'TS declaration'],
      ['styles', 'style'],
      ['deps', 'project dependencies'],
      ['release', 'release project'],
      ['other', 'other changes']
    ],
    gitCommitTypes: [
      ['feat', 'A new feature'],
      ['fix', 'A bug fix'],
      ['docs', 'Documentation only changes'],
      ['style', 'Changes that do not affect the meaning of the code'],
      ['refactor', 'A code change that neither fixes a bug nor adds a feature'],
      ['perf', 'A code change that improves performance'],
      ['test', 'Adding missing tests or correcting existing tests'],
      ['build', 'Changes that affect the build system or external dependencies'],
      ['ci', 'Changes to our CI configuration files and scripts'],
      ['chore', "Other changes that don't modify src or test files"],
      ['revert', 'Reverts a previous commit']
    ],
    gitCommitVerify: `${bgRed(' ERROR ')} ${red('git commit message must match the Conventional Commits standard!')}\n\n${green(
      'Recommended to use the command `pnpm commit` to generate Conventional Commits compliant commit information.\nGet more info about Conventional Commits, follow this link: https://conventionalcommits.org'
    )}`,
    gitEmojiMap
  },
  'zh-cn': {
    gitCommitMessages: {
      description: `请输入描述信息（${yellow('!')}开头表示破坏性改动）`,
      gitEmoji: '请选择提交表情',
      scopes: '请选择提交范围',
      types: '请选择提交类型'
    },
    gitCommitScopes: [
      ['projects', '项目'],
      ['packages', '包'],
      ['components', '组件'],
      ['hooks', '钩子函数'],
      ['utils', '工具函数'],
      ['types', 'TS类型声明'],
      ['styles', '代码风格'],
      ['deps', '项目依赖'],
      ['release', '发布项目新版本'],
      ['other', '其他的变更']
    ],
    gitCommitTypes: [
      ['feat', '新功能'],
      ['fix', '修复Bug'],
      ['docs', '只涉及文档更新'],
      ['style', '修改代码风格，不影响代码含义的变更'],
      ['refactor', '代码重构，既不修复 bug 也不添加功能的代码变更'],
      ['perf', '可提高性能的代码更改'],
      ['test', '添加缺失的测试或更正现有测试'],
      ['build', '影响构建系统或外部依赖项的更改'],
      ['ci', '对 CI 配置文件和脚本的更改'],
      ['chore', '没有修改src或测试文件的其他变更'],
      ['revert', '还原先前的提交']
    ],
    gitCommitVerify: `${bgRed(' 错误 ')} ${red('git 提交信息必须符合 Conventional Commits 标准!')}\n\n${green(
      '推荐使用命令 `pnpm commit` 生成符合 Conventional Commits 标准的提交信息。\n获取有关 Conventional Commits 的更多信息，请访问此链接: https://conventionalcommits.org'
    )}`,
    gitEmojiMap
  }
};
