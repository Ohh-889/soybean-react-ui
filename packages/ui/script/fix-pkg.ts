import fs from 'node:fs';

import { getPath, lintFile } from './shared';

// eslint-disable-next-line n/prefer-global/process
const mode = process.argv[2]; // node scripts/update-exports.ts dev

if (mode !== 'dev' && mode !== 'prod') {
  console.error('❌ please pass in the parameter: dev or prod');
  // eslint-disable-next-line n/prefer-global/process
  process.exit(1);
}

const pkgPath = getPath('package.json');

// 读取原始 package.json 内容
const raw = fs.readFileSync(pkgPath, 'utf-8');
const pkg = JSON.parse(raw);

// 替换 exports 字段
if (mode === 'dev') {
  pkg.exports = {
    '.': {
      import: './src/index.ts'
    }
  };
} else if (mode === 'prod') {
  pkg.exports = {
    '.': {
      import: './dist/index.js',
      require: './dist/index.js',
      types: './dist/index.d.ts'
    },
    './*': {
      import: './dist/components/*/index.js',
      require: './dist/components/*/index.js',
      types: './dist/components/*/index.d.ts'
    },
    './utils': {
      import: './dist/lib/index.js',
      require: './dist/lib/index.js',
      types: './dist/lib/index.d.ts'
    }
  };
}

try {
  // 写入修改后的 package.json
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log(`✅ "exports" field has been updated to "${mode}" mode.`);

  lintFile(pkgPath);
} catch (error) {
  console.error(`❌ Failed to write package.json: ${error}`);
  // eslint-disable-next-line n/prefer-global/process
  process.exit(1);
}
