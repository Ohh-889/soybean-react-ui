/**
 * Demo 注册表
 * 用于在 MDX 中快速引用 demo 组件
 */

export const demoRegistry = {
  // Button demos
  'button-basic': '@/demos/button-basic.tsx',
  'button-disabled': '@/demos/button-disabled.tsx',
  'button-icons': '@/demos/button-icons.tsx',
  'button-loading': '@/demos/button-loading.tsx',
  'button-sizes': '@/demos/button-sizes.tsx',
  'button-variants': '@/demos/button-variants.tsx',

  // Card demos
  'card-basic': '@/demos/card-basic.tsx',
  'card-full': '@/demos/card-full.tsx',
  // Input demos
  'input-basic': '@/demos/input-basic.tsx',

  'input-disabled': '@/demos/input-disabled.tsx',
  'input-types': '@/demos/input-types.tsx'
} as const;

export type DemoKey = keyof typeof demoRegistry;

/**
 * 获取 demo 路径
 */
export function getDemoPath(key: DemoKey): string {
  return demoRegistry[key];
}
