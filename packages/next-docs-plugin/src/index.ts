import path from 'node:path';

import { visit } from 'unist-util-visit';

export * from './components';

// 保留 pascal 工具
export const pascal = str => {
  const parts = str?.split(/[\.\-\s_]/).map(x => x.toLowerCase()) ?? [];
  if (parts.length === 0) return '';
  return parts.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
};

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

export default function rehypeCodeMeta(opt: { isRemark?: boolean } = {}) {
  const { isRemark = false } = opt;

  console.log('isRemark', isRemark);
  return tree => {
    // if (isRemark) {
    //   console.log('tree', tree.children[0]);
    //   return visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
    //     console.log('node', node);
    //     const lang = node.lang?.toLowerCase();
    //     if (!parent || !['jsx', 'tsx'].includes(lang)) return;

    //     const { attrs, highlight } = parseMeta(node.meta);

    //     // parent.children.splice(index, 1, {
    //     //   attributes: [
    //     //     { name: 'code', type: 'mdxJsxAttribute', value: node.value ?? '' },
    //     //     { name: 'lang', type: 'mdxJsxAttribute', value: lang },
    //     //     ...(attrs.title ? [{ name: 'title', type: 'mdxJsxAttribute', value: String(attrs.title) }] : []),
    //     //     ...(highlight ? [{ name: 'highlight', type: 'mdxJsxAttribute', value: highlight }] : []),
    //     //     ...(attrs.wrap ? [{ name: 'defaultWrap', type: 'mdxJsxAttribute', value: true }] : []),
    //     //     ...(attrs.noNumbers ? [{ name: 'defaultShowNumbers', type: 'mdxJsxAttribute', value: false }] : [])
    //     //   ],
    //     //   children: [],
    //     //   name: 'Demo',
    //     //   type: 'mdxJsxFlowElement'
    //     // });
    //   });
    // }

    const importDecls = [];
    const demoComponents = new Set();

    visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
      if (node.name !== 'Demo') return;

      const srcAttr = node.attributes?.find(attr => attr.name === 'src');
      if (!srcAttr) return;

      const src = String(srcAttr.value);

      // 生成唯一的组件名
      const basename = path.basename(src, path.extname(src));
      let componentName = pascal(basename);

      // 确保组件名唯一
      let counter = 1;
      const originalName = componentName;
      while (demoComponents.has(componentName)) {
        componentName = `${originalName}${counter}`;
        counter++;
      }
      demoComponents.add(componentName);

      // 添加 import 声明
      importDecls.push(`import ${componentName} from '${src}';`);

      // 获取其他属性
      const otherAttrs = node.attributes?.filter(attr => attr.name !== 'src') || [];

      // 替换为带子组件的 Demo
      parent.children[index] = {
        attributes: [{ name: 'src', type: 'mdxJsxAttribute', value: src }, ...otherAttrs],
        children: [
          {
            attributes: [],
            children: [],
            data: { _mdxExplicitJsx: true },
            name: componentName,
            type: 'mdxJsxFlowElement'
          }
        ],
        data: { _mdxExplicitJsx: true },
        name: 'Demo',
        type: 'mdxJsxFlowElement'
      };
    });

    // 在文档开头插入所有 import 声明
    if (importDecls.length > 0) {
      console.log('🔥 插入 imports:', importDecls);

      // 创建正确的 ESM import 节点
      const importNode = {
        data: {
          estree: {
            body: [
              {
                source: { raw: "'@/demos/button-basic.tsx'", type: 'Literal', value: '@/demos/button-basic.tsx' },
                specifiers: [
                  {
                    local: { name: 'ButtonBasic', type: 'Identifier' },
                    type: 'ImportDefaultSpecifier'
                  }
                ],
                type: 'ImportDeclaration'
              }
            ],
            type: 'Program'
          }
        },
        type: 'mdxjsEsm',
        value: importDecls.join('\n')
      };

      // 插入到开头（在所有现有内容之前）
      tree.children.unshift(importNode);

      console.log('🔥 AST 已更新，children 数量:', tree);
    }
  };
}
