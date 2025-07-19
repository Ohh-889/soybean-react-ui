import fs from 'node:fs';
import path from 'node:path';

import { JSDOM } from 'jsdom';

// 创建索引

// eslint-disable-next-line n/prefer-global/process
const htmlDir = path.join(process.cwd(), '.next/server/app/'); // 假设你先执行了 `next export`
const pages: any[] = [];

function extractHeadingsFromHtml(html: string) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const title = document.querySelector('title')?.textContent || '';
  const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(el => el.textContent || '');
  return { content: headings, title };
}

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.html')) {
      const html = fs.readFileSync(fullPath, 'utf-8');
      const { content, title } = extractHeadingsFromHtml(html);
      const relativePath = path.relative(htmlDir, fullPath);

      const doc = {
        content,
        id: relativePath,
        title
      };

      pages.push(doc);
    }
  }
}

walk(htmlDir);

// 输出索引数据
fs.writeFileSync('public/flexsearch-index.json', JSON.stringify(pages, null, 2), 'utf-8');
console.log('✅ FlexSearch 索引构建完成');
