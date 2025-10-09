// ./rehype-code-meta.js
import type { Root } from 'hast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

function parseMetaToData(meta: string): Record<string, string | boolean> {
  if (!meta) return {};

  const attrs: Record<string, string | boolean> = {};

  // ✅ 支持 filename="test.ts"、height=300、copy 这种混合形式
  const regex = /([\w-]+)(?:=(?:"([^"]*)"|(\S+)))?/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(meta))) {
    console.log('match', match);
    const [, key, quotedVal, unquotedVal] = match;
    attrs[`data-${key}`] = quotedVal ?? unquotedVal ?? true;
  }

  return attrs;
}

function parseMeta(meta) {
  // 支持：title="Demo.tsx" {1,3-5} wrap noNumbers
  const res = { attrs: {}, highlight: '' };
  if (!meta) return res;
  // highlight 语法：{1,3-5}
  const m = meta.match(/\{([^}]+)\}/);
  if (m) res.highlight = m[1];
  // 其它键值对 & flag
  const kv = meta.replace(/\{[^}]+\}/, '').trim();
  const re = /(\w+)(?:=(?:"([^"]+)"|(\S+)))?/g;
  let t;
  while ((t = re.exec(kv))) {
    const [, key, qv, uv] = t;
    res.attrs[key] = qv ?? uv ?? true;
  }
  return res;
}

const rehypeCodeMeta: Plugin<[Opts: MathJaxOptions, isRemoteContent: boolean], Root> = opt => {
  console.log('isRemark', opt);
  if (opt?.isRemark) {
    return tree => {
      visit(tree, 'code', (node, index, parent) => {
        const lang = node.lang?.toLowerCase();
        if (!parent || !['jsx', 'tsx'].includes(lang)) return;

        const { attrs, highlight } = parseMeta(node.meta);

        parent.children.splice(index, 1, {
          attributes: [
            { name: 'code', type: 'mdxJsxAttribute', value: node.value ?? '' },
            { name: 'lang', type: 'mdxJsxAttribute', value: lang },
            ...(attrs.title ? [{ name: 'title', type: 'mdxJsxAttribute', value: String(attrs.title) }] : []),
            ...(highlight ? [{ name: 'highlight', type: 'mdxJsxAttribute', value: highlight }] : []),
            ...(attrs.wrap ? [{ name: 'defaultWrap', type: 'mdxJsxAttribute', value: true }] : []),
            ...(attrs.noNumbers ? [{ name: 'defaultShowNumbers', type: 'mdxJsxAttribute', value: false }] : [])
          ],
          children: [],
          name: 'LiveDemo',
          type: 'mdxJsxFlowElement'
        });
      });
    };
  }

  return tree => {
    visit(tree, 'element', node => {
      if (node.tagName === 'code' && node.properties?.['data-language']) {
        const meta = node?.data as { meta: string };

        if (meta?.meta) {
          const a = parseMetaToData(meta.meta);

          node.properties = {
            ...node.properties,
            ...a
          };
        }
      }
    });
  };
};

export * from './components';

export default rehypeCodeMeta;


import { Button } from '@/components/button';

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button>默认按钮</Button>
      <Button variant="primary">主要按钮</Button>
      <Button variant="outline">次要按钮</Button>
    </div>
  );
}
