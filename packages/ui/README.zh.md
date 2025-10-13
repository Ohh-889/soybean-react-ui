# Skyroc UI

<div align="center">

![npm version](https://img.shields.io/npm/v/skyroc-ui.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)

一个基于 Radix UI 和 Tailwind CSS 构建的现代化 React UI 组件库，提供 50+ 个高质量组件，具有出色的可访问性和类型安全。

[English](./README.md) | [简体中文](./README.zh.md)

</div>

## ✨ 特性

- 🎨 **现代化设计** - 精美简洁的设计，支持亮色和暗色主题
- 🧩 **50+ 组件** - 全面的高质量 React 组件集合
- 🔧 **高度可定制** - 基于 Tailwind CSS 构建，支持主题定制
- 📱 **响应式** - 移动优先设计，适配所有设备
- ♿ **无障碍访问** - 基于 Radix UI 构建，遵循 WAI-ARIA 标准
- 🚀 **TypeScript** - 完整的 TypeScript 支持，优秀的开发体验
- 📋 **强大的表单** - 内置表单系统，支持验证和状态管理
- 🎯 **Tree Shaking** - 支持 tree-shaking，优化打包体积
- 🔄 **SSR 就绪** - 完美支持 Next.js 和其他 SSR 框架

## 📦 安装

```bash
# npm
npm install skyroc-ui

# pnpm
pnpm add skyroc-ui

# yarn
yarn add skyroc-ui
```

### Tailwind CSS 配置

安装 Tailwind CSS 插件：

```bash
npm install @skyroc/tailwind-plugin
```

在 `tailwind.config.js` 中配置：

```js
import { skyroc } from '@skyroc/tailwind-plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/skyroc-ui/dist/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [skyroc()]
}
```

## 🚀 快速开始

```tsx
import { Button, Card, Input } from 'skyroc-ui'

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>欢迎使用 Skyroc UI</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        <Input placeholder="请输入内容" />
        <Button>提交</Button>
      </Card.Content>
    </Card>
  )
}
```

## 🧩 组件

### 基础组件
- **Button** - 多种样式和状态的按钮
- **Input** - 多种类型的文本输入框
- **Card** - 卡片容器组件
- **Badge** - 状态指示器
- **Avatar** - 用户头像显示
- **Chip** - 用于标签的紧凑元素
- **Icon** - 支持 Iconify 的图标组件

### 布局组件
- **Divider** - 视觉分隔符
- **Breadcrumb** - 面包屑导航
- **Tabs** - 标签页界面
- **Collapsible** - 可展开的内容面板
- **Resizable** - 可调整大小的面板布局
- **Aspect Ratio** - 保持纵横比
- **Scroll Area** - 自定义滚动区域

### 表单组件
- **Form** - 强大的表单系统
- **Checkbox** - 复选框输入
- **Radio** - 单选按钮组
- **Select** - 下拉选择器
- **Switch** - 切换开关
- **Slider** - 范围滑块
- **Textarea** - 多行文本输入
- **Input OTP** - 一次性密码输入
- **Label** - 表单标签

### 反馈组件
- **Alert** - 警告消息
- **Dialog** - 模态对话框
- **Drawer** - 滑出面板
- **Sheet** - 底部面板
- **Popover** - 浮动内容
- **Tooltip** - 上下文提示
- **Progress** - 进度指示器
- **Skeleton** - 加载占位符
- **Sonner** - 消息通知
- **Alert Dialog** - 确认对话框
- **Hover Card** - 悬停触发的卡片

### 导航组件
- **Menu** - 菜单组件
- **Menubar** - 菜单栏
- **Navigation Menu** - 导航菜单
- **Context Menu** - 右键菜单
- **Dropdown Menu** - 下拉菜单

### 数据展示
- **Carousel** - 图片/内容轮播
- **Command** - 命令面板
- **Accordion** - 可折叠部分
- **Keyboard Key** - 键盘快捷键显示

### 工具组件
- **ConfigProvider** - 全局配置
- **If** - 条件渲染助手
- **Toggle** - 切换按钮
- **Toggle Group** - 切换按钮组
- **Segment** - 分段控制器

## 📖 文档

详细文档和在线示例，请访问：

- **文档**: [https://github.com/Ohh-889/skyroc-ui](https://github.com/Ohh-889/skyroc-ui)
- **GitHub**: [https://github.com/Ohh-889/skyroc-ui](https://github.com/Ohh-889/skyroc-ui)

## 🛠️ 开发

```bash
# 安装依赖
pnpm install

# 启动开发
pnpm dev

# 构建库
pnpm build

# 运行代码检查
pnpm lint
```

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](../../LICENSE) 文件了解详情。

## 🙏 致谢

- [Radix UI](https://www.radix-ui.com/) - 提供了优秀的无头组件
- [Tailwind CSS](https://tailwindcss.com/) - 提供了强大的样式系统
- [shadcn/ui](https://ui.shadcn.com/) - 设计灵感来源
- [Lucide React](https://lucide.dev/) - 提供了精美的图标

## 📞 联系方式

- 作者: Ohh
- 邮箱: 1509326266@qq.com
- GitHub: [@Ohh-889](https://github.com/Ohh-889)

---

<div align="center">

用 ❤️ 制作，作者 [Ohh](https://github.com/Ohh-889)

如果这个项目对你有帮助，请给它一个 ⭐️！

</div>

