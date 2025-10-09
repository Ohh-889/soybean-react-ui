# 从 LiveDemo 迁移到 Demo

## ⚡ 为什么要迁移？

### LiveDemo（旧方案）的问题

```tsx
<LiveDemo code={`...长代码...`} lang="tsx" />
```

**缺点：**
- ❌ 客户端引入完整 Babel (~2MB)
- ❌ 运行时编译，首次渲染慢
- ❌ 使用 `new Function`，安全风险
- ❌ 无法导入外部依赖
- ❌ 无类型检查
- ❌ 代码字符串难以维护

### Demo（新方案）的优势

```tsx
<Demo demo="button-basic" />
```

**优点：**
- ✅ 零运行时开销，构建时处理
- ✅ 真实的 TypeScript 文件
- ✅ 完整的类型检查和 IDE 支持
- ✅ 可以正常导入任何依赖
- ✅ 自动代码分割
- ✅ 更好的开发体验

## 📝 迁移步骤

### 步骤 1：提取代码到文件

**之前：**
```mdx
<LiveDemo code={`import { Button } from '@/components/button';

export default function Demo() {
  return <Button>Click me</Button>;
}`} />
```

**操作：**
1. 在 `docs/demos/` 创建文件 `button-basic.tsx`
2. 复制代码内容

```tsx
// docs/demos/button-basic.tsx
import { Button } from '@/components/button';

export default function Demo() {
  return <Button>Click me</Button>;
}
```

### 步骤 2：注册到 Registry

编辑 `docs/lib/demo-registry.ts`：

```ts
export const demoRegistry = {
  'button-basic': '@/demos/button-basic.tsx',
  // ... 其他 demos
} as const;
```

### 步骤 3：更新 MDX

**之后：**
```mdx
<Demo demo="button-basic" title="基础按钮" />
```

## 🔄 实际案例

### 案例 1：简单组件

**旧代码：**
```mdx
<LiveDemo code={`import { Badge } from '@/components/badge';

export default function Demo() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
    </div>
  );
}`} lang="tsx" />
```

**迁移后：**

1. 创建 `demos/badge-variants.tsx`：
```tsx
import { Badge } from '@/components/badge';

export default function Demo() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
    </div>
  );
}
```

2. 注册：
```ts
'badge-variants': '@/demos/badge-variants.tsx',
```

3. 使用：
```mdx
<Demo demo="badge-variants" title="徽章变体" />
```

### 案例 2：带状态的组件

**旧代码：**
```mdx
<LiveDemo code={`import { Button } from '@/components/button';
import { useState } from 'react';

export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(c => c + 1)}>+1</Button>
    </div>
  );
}`} />
```

**迁移后：**

```tsx
// demos/counter-demo.tsx
import { Button } from '@/components/button';
import { useState } from 'react';

export default function Demo() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <p className="text-lg">Count: {count}</p>
      <Button onClick={() => setCount(c => c + 1)}>+1</Button>
    </div>
  );
}
```

### 案例 3：使用外部库

**现在可以了！**

```tsx
// demos/animated-button.tsx
import { Button } from '@/components/button';
import { motion } from 'framer-motion';

export default function Demo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Button>Animated Button</Button>
    </motion.div>
  );
}
```

这在 LiveDemo 中是不可能的！

## 🛠️ 批量迁移工具

如果你有很多 LiveDemo 需要迁移，可以使用这个脚本：

```bash
# 创建脚本 scripts/migrate-demos.ts
```

```ts
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// 扫描所有 .mdx 文件
const files = glob.sync('app/docs/**/*.mdx');

files.forEach(file => {
  const content = readFileSync(file, 'utf-8');

  // 提取 LiveDemo 代码块
  const regex = /<LiveDemo\s+code=\{`([^`]+)`\}/g;
  let match;
  let index = 0;

  while ((match = regex.exec(content)) !== null) {
    const code = match[1];
    const demoName = `${file.split('/').pop()?.replace('.mdx', '')}-${index}`;

    // 保存到 demos/
    writeFileSync(`demos/${demoName}.tsx`, code);

    console.log(`提取: ${demoName}`);
    index++;
  }
});
```

## 📊 性能对比

| 指标 | LiveDemo | Demo | 提升 |
| --- | --- | --- | --- |
| Bundle 大小 | +2MB | +0KB | ✅ 100% |
| 首次渲染 | ~200ms | ~10ms | ✅ 20x |
| 类型检查 | ❌ | ✅ | ✅ |
| 可导入依赖 | ❌ | ✅ | ✅ |
| IDE 支持 | ❌ | ✅ | ✅ |

## ❓ 常见问题

### Q: 需要删除 LiveDemo 吗？

A: 不需要立即删除。两种方式可以共存，但建议逐步迁移。

### Q: 所有 demo 都要创建文件吗？

A: 是的。但这样做有很多好处：
- 可以复用
- 可以测试
- 有类型检查
- 更好的维护性

### Q: 如何共享代码？

A: 创建共享工具文件：
```tsx
// demos/utils/common.ts
export const buttonStyles = "...";

// demos/button-basic.tsx
import { buttonStyles } from './utils/common';
```

### Q: 可以在 demo 中使用 console.log 调试吗？

A: 可以！Demo 就是普通的 React 组件，可以使用任何调试方法。

## 🎯 迁移检查清单

- [ ] 创建 `demos/` 目录
- [ ] 创建 `lib/demo-registry.ts`
- [ ] 创建 `components/mdx-demo.tsx`
- [ ] 更新 `mdx-components.tsx`
- [ ] 提取第一个 demo 到文件
- [ ] 测试 demo 正常工作
- [ ] 逐步迁移其他 demos
- [ ] 更新文档说明新用法
- [ ] （可选）移除 LiveDemo 依赖

## 🚀 开始迁移

从最简单的 demo 开始：

1. 找一个简单的 LiveDemo
2. 按步骤迁移
3. 验证效果
4. 继续下一个

不要一次性全部迁移，逐步进行更安全！

---

**需要帮助？** 查看 `DEMO_GUIDE.md` 了解详细用法。

