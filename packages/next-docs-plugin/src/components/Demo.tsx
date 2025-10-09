'use server';

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { Suspense } from 'react';

import { DemoFrame } from './DemoFrame';

interface DemoProps {
  children?: React.ReactNode;
  highlight?: string;
  src?: string;
  title?: string;
}

/**
 * Demo 组件 - 通过 rehype 插件编译时处理
 *
 * 使用方式：
 * <Demo src="@/demos/button-basic.tsx" title="基础按钮" />
 *
 * 编译后会变成：
 * import ButtonBasic from '@/demos/button-basic.tsx';
 * <Demo src="@/demos/button-basic.tsx" title="基础按钮">
 *   <ButtonBasic />
 * </Demo>
 */
export default async function Demo({ children, highlight, src, title }: DemoProps) {
  if (!src) {
    return <div className="text-red-500">Demo 组件需要 src 属性</div>;
  }

  // 读取源代码
  const code = await readSourceCode(src);
  const filename = path.basename(src);

  return (
    <DemoFrame
      code={code}
      filename={filename}
      highlight={highlight}
      lang={getLanguage(src)}
      title={title ?? filename}
      exportFiles={{
        'index.html': `<!doctype html><html><body><div id="root"></div><script type="module" src="src/App.tsx"></script></body></html>`,
        'package.json': JSON.stringify(
          {
            dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0' },
            devDependencies: { typescript: '^5.5.0', vite: '^5.0.0' },
            name: 'demo',
            private: true,
            scripts: { build: 'tsc && vite build', dev: 'vite', preview: 'vite preview' },
            type: 'module'
          },
          null,
          2
        ),
        'src/App.tsx': code
      }}
      preview={
        <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading...</div>}>{children}</Suspense>
      }
    >
      {children}
    </DemoFrame>
  );
}

/**
 * 读取源代码文件
 */
async function readSourceCode(src: string): Promise<string> {
  const absPath = resolvePath(src);
  try {
    return await readFile(absPath, 'utf-8');
  } catch (error) {
    console.error(`Failed to read demo file: ${absPath}`, error);
    return `// Error: Could not read file ${src}\nexport default function Demo() {\n  return <div>File not found</div>;\n}`;
  }
}

/**
 * 解析文件路径
 */
function resolvePath(src: string): string {
  if (src.startsWith('@/')) {
    return path.join(process.cwd(), src.slice(2));
  }
  if (src.startsWith('/')) {
    return src;
  }
  return path.resolve(process.cwd(), src);
}

/**
 * 获取文件语言类型
 */
function getLanguage(src: string): string {
  const ext = path.extname(src).slice(1);
  return ['tsx', 'jsx', 'ts', 'js'].includes(ext) ? ext : 'tsx';
}
