// src/lib/shiki.ts
import { type HighlighterCore, createHighlighterCore } from 'shiki';
import { createOnigurumaEngine } from 'shiki';

let highlighterInstance: Promise<HighlighterCore> | null = null;
let disposed = false;

/**
 * 懒加载 Shiki 高亮器（单例）
 */
async function getHighlighter(): Promise<HighlighterCore> {
  if (disposed) {
    highlighterInstance = null;
    disposed = false;
  }

  if (!highlighterInstance) {
    highlighterInstance = (async () => {
      const highlighter = await createHighlighterCore({
        engine: createOnigurumaEngine(import('shiki/wasm')),
        langs: [
          () => import('shiki/langs/typescript.mjs'),
          () => import('shiki/langs/javascript.mjs'),
          () => import('shiki/langs/tsx.mjs'),
          () => import('shiki/langs/bash.mjs'),
          () => import('shiki/langs/html.mjs')
        ],
        themes: [
          () => import('shiki/themes/github-dark-default.mjs'),
          () => import('shiki/themes/github-light-default.mjs')
        ]
      });
      return highlighter;
    })();
  }

  return highlighterInstance;
}

/**
 * 对外暴露高亮方法
 */
export async function highlight(
  code: string,
  lang: string = 'tsx',
  theme: string = 'github-dark-default'
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, { defaultColor: false, lang, theme });
}

/**
 * 手动释放资源
 */
export async function disposeHighlighter() {
  if (!highlighterInstance) return;
  try {
    const instance = await highlighterInstance;
    instance.dispose();
  } catch {}
  disposed = true;
  highlighterInstance = null;
}
