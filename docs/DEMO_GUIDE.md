# Demo 组件使用指南

本文档说明如何在文档中添加交互式代码演示。

## 🎯 方案对比

### ❌ 旧方案：LiveDemo（运行时编译）

```tsx
<LiveDemo code={`...`} />
```

**缺点：**
- 客户端引入完整 Babel (~2MB)
- 运行时编译，性能差
- 使用 `new Function`，有安全隐患
- 无法使用外部依赖

### ✅ 新方案：Demo（构建时方案）

```tsx
<Demo demo="button-basic" />
```

**优点：**
- ✓ 零运行时开销
- ✓ 真实的 TypeScript 文件
- ✓ 完整的类型检查
- ✓ 可以正常导入依赖
- ✓ 自动代码分割

## 📝 快速开始

### 1. 创建 Demo 文件

在 `docs/demos/` 目录下创建组件文件：

```tsx
// demos/button-basic.tsx
import { Button } from '@/components/button';

export default function Demo() {
  return <Button>点击我</Button>;
}
```

**规范：**
- 文件名使用 kebab-case：`button-basic.tsx`
- 必须 `export default` 一个组件
- 可以正常导入任何依赖

### 2. 注册到 Registry

编辑 `docs/lib/demo-registry.ts`：

```ts
export const demoRegistry = {
  'button-basic': '@/demos/button-basic.tsx',
  // ...
} as const;
```

### 3. 在 MDX 中使用

```mdx
# Button 组件

## 基础用法

<Demo demo="button-basic" title="基础按钮" />
```

## 🔧 使用方式

### 方式一：使用 Registry（推荐）

```mdx
<Demo demo="button-basic" title="基础按钮" />
```

**优点：**
- 简洁，易于维护
- 统一管理所有 demo
- 自动提示（TypeScript）

### 方式二：直接路径

```mdx
<Demo src="@/demos/button-basic.tsx" title="基础按钮" />
```

**适用场景：**
- 临时演示
- 不需要复用的 demo

### 方式三：多文件 Demo

```mdx
<Demo
  files={[
    { src: '@/demos/multi/App.tsx', title: 'App' },
    { src: '@/demos/multi/Button.tsx', title: 'Button' },
    { src: '@/demos/multi/utils.ts', title: 'Utils' }
  ]}
  entry="@/demos/multi/App.tsx"
  title="多文件示例"
/>
```

**特性：**
- Tab 切换多个文件
- 指定入口文件用于预览
- 查看完整项目结构

## 📦 Props API

### Demo 组件

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| demo | `DemoKey` | Registry 中的 demo key |
| src | `string` | Demo 文件路径（直接模式） |
| title | `string` | 标题 |
| highlight | `string` | 高亮行，如 `"1,3-5"` |
| files | `Array<{src, title}>` | 多文件模式的文件列表 |
| entry | `string` | 多文件模式的入口文件 |

## 🎨 高级用法

### 代码高亮

高亮特定行：

```mdx
<Demo
  demo="button-basic"
  highlight="3-5,7"
  title="高亮示例"
/>
```

### 复杂交互

Demo 可以包含状态、事件处理等：

```tsx
// demos/counter.tsx
import { Button } from '@/components/button';
import { useState } from 'react';

export default function Demo() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">{count}</div>
      <div className="flex gap-2">
        <Button onClick={() => setCount(c => c + 1)}>+1</Button>
        <Button onClick={() => setCount(c => c - 1)}>-1</Button>
        <Button variant="outline" onClick={() => setCount(0)}>重置</Button>
      </div>
    </div>
  );
}
```

### 使用第三方库

正常导入即可：

```tsx
// demos/with-library.tsx
import { Button } from '@/components/button';
import { motion } from 'framer-motion';

export default function Demo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Button>Animated Button</Button>
    </motion.div>
  );
}
```

## 🗂️ 目录结构

```
docs/
├── demos/                    # 所有 demo 文件
│   ├── button-basic.tsx
│   ├── button-variants.tsx
│   ├── input-basic.tsx
│   └── multi/               # 多文件 demo
│       ├── App.tsx
│       ├── Button.tsx
│       └── utils.ts
├── lib/
│   └── demo-registry.ts     # Demo 注册表
└── components/
    └── mdx-demo.tsx         # MDX Demo 包装组件
```

## 🚀 性能优化

Demo 组件使用 React 的 `lazy` 自动进行代码分割：

```tsx
const Preview = lazy(() => import('@/demos/button-basic.tsx'));
```

**好处：**
- 只有查看 Demo 时才加载代码
- 减小首次加载体积
- 更快的页面渲染

## 🔄 迁移指南

### 从 ComponentPreview 迁移

**旧代码：**
```mdx
<ComponentPreview code={`import { Button } from '@skyroc/ui';

export default function Demo() {
  return <Button>Click</Button>;
}`}>
  <Button>Click</Button>
</ComponentPreview>
```

**新代码：**

1. 创建 demo 文件 `demos/button-example.tsx`
2. 注册到 registry
3. 使用：
```mdx
<Demo demo="button-example" />
```

### 从 LiveDemo 迁移

**旧代码：**
```tsx
<LiveDemo code={code} lang="tsx" />
```

**新代码：**

1. 将代码保存为文件
2. 使用 `<Demo src="..." />`

## 🐛 常见问题

### Q: Demo 不显示？

**A:** 检查：
1. Demo 文件是否正确 export default
2. Registry 中路径是否正确
3. 是否有 TypeScript 错误

### Q: 如何调试 Demo？

**A:** Demo 是普通的 React 组件，可以：
1. 直接在 demos/ 文件中添加 console.log
2. 使用 React DevTools
3. 检查浏览器控制台

### Q: 可以使用 Hooks 吗？

**A:** 可以！Demo 就是普通组件：
```tsx
export default function Demo() {
  const [state, setState] = useState(0);
  useEffect(() => { ... }, []);
  return ...;
}
```

### Q: 如何共享代码？

**A:** 创建共享的 utils：
```tsx
// demos/utils/common.tsx
export const sharedStyles = "...";

// demos/button-basic.tsx
import { sharedStyles } from './utils/common';
```

## 📚 示例参考

查看现有 demos：
- `demos/button-*.tsx` - 按钮示例
- `demos/input-*.tsx` - 输入框示例
- `demos/card-*.tsx` - 卡片示例

---

**享受编写文档的乐趣！** 🎉

