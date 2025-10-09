/**
 * Demos 导入映射
 * 所有 demo 组件必须在这里注册
 */

// Button demos
export { default as buttonBasic } from './button-basic';
export { default as buttonDisabled } from './button-disabled';
export { default as buttonIcons } from './button-icons';
export { default as buttonLoading } from './button-loading';
export { default as buttonSizes } from './button-sizes';
export { default as buttonVariants } from './button-variants';

// Card demos
export { default as cardBasic } from './card-basic';
// Input demos
export { default as inputBasic } from './input-basic';

export { default as inputTypes } from './input-types';

// 导出类型
export type DemoComponent = React.ComponentType;

// 导出映射表（运行时使用）
export const demoMap = {
  'button-basic': () => import('./button-basic'),
  'button-disabled': () => import('./button-disabled'),
  'button-icons': () => import('./button-icons'),
  'button-loading': () => import('./button-loading'),
  'button-sizes': () => import('./button-sizes'),
  'button-variants': () => import('./button-variants'),
  'card-basic': () => import('./card-basic'),
  'input-basic': () => import('./input-basic'),
  'input-types': () => import('./input-types')
} as const;

export type DemoKey = keyof typeof demoMap;
