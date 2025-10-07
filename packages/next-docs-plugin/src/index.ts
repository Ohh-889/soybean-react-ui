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

const rehypeCodeMeta: Plugin<[Opts: MathJaxOptions, isRemoteContent: boolean], Root> = () => {
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
