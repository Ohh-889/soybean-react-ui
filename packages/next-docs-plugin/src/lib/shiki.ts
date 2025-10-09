// lib/highlight-code.ts
import { codeToHtml } from 'shiki';

// src/lib/parse-range.ts
export function parseLineRange(input?: string): Set<number> {
  const set = new Set<number>();
  if (!input) return set;
  String(input)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .forEach(seg => {
      const m = seg.match(/^(\d+)-(\d+)$/);
      if (m) {
        const a = +m[1];
        const b = +m[2];
        if (a <= b) for (let i = a; i <= b; i++) set.add(i);
      } else {
        const n = Number(seg);
        if (!Number.isNaN(n)) set.add(n);
      }
    });
  return set;
}

export async function highlightCode(code: string, language = 'tsx', opts?: { highlight?: string }) {
  const html = await codeToHtml(code, {
    lang: language,
    themes: { dark: 'github-dark', light: 'github-light' },
    transformers: [
      {
        code(node) {
          node.properties['data-line-numbers'] = '';
        },
        line(node) {
          node.properties['data-line'] = '';
        },
        pre(node) {
          node.properties.tabindex = 0;
          node.properties.class = 'no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none !bg-transparent';
        }
      }
    ]
  });

  if (!opts?.highlight) return html;

  // 给指定行加 data-highlighted-line=""
  const want = parseLineRange(opts.highlight);
  if (want.size === 0) return html;

  // 可靠字符串处理：逐个 <span class="line"> 计数
  const token = '<span class="line">';
  let out = '';
  let idx = 0;
  let start = 0;
  while (true) {
    const pos = html.indexOf(token, start);
    if (pos === -1) {
      out += html.slice(start);
      break;
    }
    out += html.slice(start, pos);
    idx += 1;
    // 插入高亮属性
    out += want.has(idx) ? '<span class="line" data-highlighted-line="">' : token;
    start = pos + token.length;
  }
  return out;
}
