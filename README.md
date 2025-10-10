# Soybean React UI

<div align="center">

![Soybean React UI](https://img.shields.io/badge/Soybean-React%20UI-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-blue.svg)

一个现代化的 React UI 组件库，基于 Radix UI 和 Tailwind CSS 构建，提供丰富的组件和强大的表单系统。

[🚀 快速开始](#快速开始) • [📖 文档](#文档) • [🎮 演示](#演示) • [🛠️ 开发](#开发)

</div>

## ✨ 特性

- 🎨 **现代化设计** - 基于最新的设计系统，支持亮暗主题切换
- 🧩 **丰富组件** - 50+ 高质量 React 组件，涵盖常见业务场景
- 🔧 **高度可定制** - 基于 Tailwind CSS，支持主题定制和样式覆盖
- 📱 **响应式设计** - 完美适配移动端和桌面端
- ♿ **无障碍访问** - 基于 Radix UI，符合 WAI-ARIA 标准
- 🚀 **TypeScript** - 完整的 TypeScript 支持，提供优秀的开发体验
- 📋 **强大表单** - 内置高性能表单系统，支持复杂验证和状态管理
- 🎯 **Tree Shaking** - 支持按需导入，优化打包体积
- 🔄 **SSR 友好** - 完美支持 Next.js 和其他 SSR 框架

## 🏗️ 项目结构

```
skyroc-ui/
├── packages/
│   ├── ui/                    # 核心 UI 组件库
│   ├── tailwind-plugin/       # Tailwind CSS 插件
│   └── color/                 # 颜色系统
├── playground/                # 组件演示和测试
├── docs/                      # 文档站点
├── primitives/                # 基础原语组件
│   ├── filed-form/           # 表单系统
│   ├── utils/                # 工具函数
│   └── type-utils/           # 类型工具
└── internal/
    ├── ui-kit/               # 开发工具
    └── create-skyroc/        # 项目脚手架
```

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install soybean-react-ui

# 使用 pnpm
pnpm add soybean-react-ui

# 使用 yarn
yarn add soybean-react-ui
```

### 配置 Tailwind CSS

安装 Tailwind CSS 插件：

```bash
npm install @soybean-react-ui/tailwind-plugin
```

在 `tailwind.config.js` 中配置：

```js
import { soybeanUIPlugin } from '@soybean-react-ui/tailwind-plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/soybean-react-ui/dist/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [soybeanUIPlugin()]
}
```

### 基础使用

```tsx
import { Button, Card, Input } from 'soybean-react-ui'

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>欢迎使用 Soybean React UI</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        <Input placeholder="请输入内容" />
        <Button>提交</Button>
      </Card.Content>
    </Card>
  )
}
```

### 使用脚手架创建项目

```bash
npx create-skyroc my-app
cd my-app
npm run dev
```

## 🎮 演示

访问我们的在线演示站点查看所有组件的实际效果：

- **Playground**: [https://your-playground-url.com](https://your-playground-url.com)
- **文档站点**: [https://your-docs-url.com](https://your-docs-url.com)

## 📦 核心组件

### 基础组件
- **Button** - 按钮组件，支持多种样式和状态
- **Input** - 输入框组件，支持各种输入类型
- **Card** - 卡片容器组件
- **Badge** - 标记组件
- **Avatar** - 头像组件

### 布局组件
- **Divider** - 分割线组件
- **Breadcrumb** - 面包屑导航
- **Tabs** - 标签页组件
- **Collapsible** - 折叠面板
- **Resizable** - 可调整大小的面板

### 表单组件
- **Form** - 强大的表单系统
- **Checkbox** - 复选框
- **Radio** - 单选框
- **Select** - 选择器
- **Switch** - 开关
- **Slider** - 滑块
- **Textarea** - 多行文本输入

### 反馈组件
- **Alert** - 警告提示
- **Dialog** - 对话框
- **Drawer** - 抽屉
- **Popover** - 弹出框
- **Tooltip** - 工具提示
- **Progress** - 进度条
- **Skeleton** - 骨架屏
- **Sonner** - 通知组件

### 导航组件
- **Menu** - 菜单组件
- **Menubar** - 菜单栏
- **Navigation Menu** - 导航菜单
- **Context Menu** - 右键菜单
- **Dropdown Menu** - 下拉菜单

### 数据展示
- **Carousel** - 轮播图
- **Command** - 命令面板
- **Scroll Area** - 滚动区域
- **Hover Card** - 悬浮卡片

## 🎨 主题定制

Soybean React UI 支持灵活的主题定制：

### 颜色系统

```tsx
import { ConfigProvider } from 'soybean-react-ui'

function App() {
  return (
    <ConfigProvider
      theme={{
        color: 'blue', // primary | success | warning | error | info
      }}
    >
      <YourApp />
    </ConfigProvider>
  )
}
```

### 自定义 CSS 变量

```css
:root {
  --primary: 220 100% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 14% 96%;
  --secondary-foreground: 220 9% 46%;
  /* 更多变量... */
}
```

## 📋 表单系统

内置强大的表单系统，支持复杂的表单场景：

```tsx
import { Form, useForm } from 'soybean-react-ui'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(2, '用户名至少2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
})

function MyForm() {
  const form = useForm({
    schema,
    defaultValues: {
      username: '',
      email: '',
    }
  })

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <Form.Field name="username">
        <Form.Label>用户名</Form.Label>
        <Form.Control>
          <Input placeholder="请输入用户名" />
        </Form.Control>
        <Form.Message />
      </Form.Field>

      <Form.Field name="email">
        <Form.Label>邮箱</Form.Label>
        <Form.Control>
          <Input type="email" placeholder="请输入邮箱" />
        </Form.Control>
        <Form.Message />
      </Form.Field>

      <Button type="submit">提交</Button>
    </Form>
  )
}
```

### 表单特性

- ✅ **类型安全** - 完整的 TypeScript 支持
- ✅ **性能优化** - 智能重渲染，只更新必要的组件
- ✅ **验证系统** - 支持 Zod、Yup 等验证库
- ✅ **异步验证** - 支持异步验证规则
- ✅ **字段数组** - 支持动态字段和嵌套结构
- ✅ **计算字段** - 支持依赖其他字段的计算值
- ✅ **中间件** - 支持表单中间件扩展
- ✅ **撤销重做** - 内置撤销重做功能

## 🛠️ 开发

### 环境要求

- Node.js >= 18
- pnpm >= 9.0.0

### 开发设置

```bash
# 克隆仓库
git clone https://github.com/your-username/skyroc-ui.git
cd skyroc-ui

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建组件库
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

### 项目脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建所有包
- `pnpm lint` - 运行 ESLint 检查
- `pnpm format` - 格式化代码
- `pnpm deploy:playground` - 部署演示站点

### 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 致谢

- [Radix UI](https://www.radix-ui.com/) - 提供了优秀的无头组件
- [Tailwind CSS](https://tailwindcss.com/) - 提供了强大的样式系统
- [shadcn/ui](https://ui.shadcn.com/) - 设计灵感来源
- [Lucide React](https://lucide.dev/) - 提供了精美的图标

## 📞 联系我们

- 作者: Ohh
- 邮箱: 15093262@qq.com
- GitHub: [https://github.com/Ohh-889/soybean-react-ui](https://github.com/Ohh-889/soybean-react-ui)

---

<div align="center">

如果这个项目对你有帮助，请给我们一个 ⭐️！

</div>
