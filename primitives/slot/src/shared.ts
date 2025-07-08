export type AnyProps = Record<string, any>;

// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.
export function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as { ref?: React.Ref<unknown> }).ref;
  }

  // Not DEV
  return (element.props as { ref?: React.Ref<unknown> }).ref || (element as any).ref;
}

/**
 * 合并插槽外部传入的 props 和子组件已有的 props
 * Merge props from slot and child component
 *
 * 合并规则如下：
 * 1. 子组件的 props 优先（child props take precedence）
 * 2. 对事件处理函数（onClick 等）进行组合调用（compose both handlers）
 * 3. 对 style 做对象合并（merge objects）
 * 4. 对 className 做字符串拼接（concat classes）
 */
export function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // 默认以子组件的 props 为主，拷贝一份
  const overrideProps = { ...childProps };

  // 遍历子组件的 props
  // Iterate through childProps
  // eslint-disable-next-line guard-for-in
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName]; // 插槽上的属性值
    const childPropValue = childProps[propName]; // 子组件上的属性值

    const isHandler = /^on[A-Z]/.test(propName); // 是否为事件处理函数，如 onClick

    if (isHandler) {
      // 如果 slot 和 child 都提供了事件处理函数，组合调用
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          const result = childPropValue(...args); // 先执行子组件自己的
          slotPropValue(...args); // 再执行插槽传入的
          return result;
        };
      }
      // 如果只有插槽提供了事件处理函数，直接用它的
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }

    // 合并 style（对象展开）
    else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    }

    // 合并 className（用空格拼接）
    else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  // 最终返回合并后的 props，slotProps 保证兜底
  return { ...slotProps, ...overrideProps };
}
