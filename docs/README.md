# Skyroc UI 文档网站

现代、优雅、简洁的 Skyroc UI 组件库文档网站。

## ✨ 特性

- 🎨 **精美设计** - 基于品牌色 `hsl(237 100% 70%)` 的视觉系统
- 🌙 **深色模式** - 完美适配的深色主题
- 📱 **响应式** - 移动端友好的布局设计
- 🔍 **易于导航** - 清晰的侧边栏和导航结构
- 💻 **代码预览** - 实时组件预览和代码展示
- ⚡ **高性能** - 基于 Next.js 15 App Router

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看文档网站。

### 构建生产版本

```bash
pnpm build
```

## 📁 项目结构

```
docs/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 根布局（主题提供者）
│   ├── page.tsx                 # 首页
│   ├── globals.css              # 全局样式
│   └── docs/                    # 文档页面
│       ├── layout.tsx           # 文档布局
│       ├── page.mdx             # 介绍
│       ├── installation/        # 安装指南
│       ├── quick-start/         # 快速开始
│       └── components/          # 组件文档
│           ├── button/
│           ├── input/
│           ├── card/
│           └── ...
├── components/                   # React 组件
│   ├── navbar.tsx               # 顶部导航栏
│   ├── sidebar.tsx              # 侧边文档导航
│   ├── component-preview.tsx   # 组件预览容器
│   ├── theme-provider.tsx      # 主题提供者
│   ├── mdx-heading.tsx         # MDX 标题组件
│   └── heading-anchor.client.tsx # 标题锚点
├── mdx-components.tsx          # MDX 组件配置
└── next.config.ts              # Next.js 配置
```

## 🎨 设计系统

### 主题色

```css
--color-brand: hsl(237 100% 70%);
--color-brand-hover: hsl(237 100% 75%);
--color-brand-active: hsl(237 100% 65%);
```

### 字体

- 正文：Inter
- 代码：JetBrains Mono / Fira Code / Consolas

### 排版

- H1: 4xl-6xl, 粗体，渐变色
- H2: 2xl-3xl, 半粗体，带下划线和品牌色强调
- H3: xl-2xl, 半粗体
- 正文：舒适的行高 1.75

## 📝 添加新文档

### 创建 MDX 文档

在 `app/docs/` 下创建新的 `.mdx` 文件：

```mdx
export const metadata = {
  title: '组件名称',
  description: '组件描述'
}

# 组件名称

组件说明...

## 基础用法

\`\`\`tsx
import { Component } from '@skyroc/ui';
\`\`\`
```

### 添加组件预览

使用 `ComponentPreview` 组件：

```tsx
import { ComponentPreview } from '@/components/component-preview';

<ComponentPreview code={`import { Button } from '@skyroc/ui';

export default function Demo() {
  return <Button>Click me</Button>;
}`}>
  <Button>Click me</Button>
</ComponentPreview>
```

### 更新侧边栏导航

编辑 `components/sidebar.tsx`，添加新的导航项：

```tsx
{
  title: '组件',
  items: [
    // ... 现有项
    { title: '新组件', href: '/docs/components/new-component' }
  ]
}
```

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS 4
- **内容**: MDX
- **代码高亮**: Shiki + rehype-pretty-code
- **主题**: next-themes
- **图标**: Lucide React
- **类型**: TypeScript

## 📦 依赖

主要依赖：

- `@next/mdx` - MDX 支持
- `@mdx-js/react` - React MDX 组件
- `next-themes` - 主题切换
- `rehype-pretty-code` - 代码高亮
- `shiki` - 语法高亮引擎
- `lucide-react` - 图标库

## 🎯 最佳实践

### 标题层级

- 每个页面只使用一个 H1（页面标题）
- 使用 H2 作为主要章节
- H3-H6 用于子章节

### 代码示例

- 提供完整的导入语句
- 使用 TypeScript
- 添加必要的注释
- 保持代码简洁

### 组件预览

- 在浅色背景上展示
- 提供代码和预览切换
- 确保响应式显示

## 🌐 部署

可以部署到任何支持 Next.js 的平台：

- Vercel
- Netlify
- Cloudflare Pages
- 自托管

```bash
pnpm build
pnpm start
```

## 📄 许可

MIT License

---

**Skyroc UI** - 优雅、简洁、现代化的 React 组件库
