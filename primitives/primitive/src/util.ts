import { flushSync } from 'react-dom';

export function dispatchDiscreteCustomEvent<E extends CustomEvent>(target: E['target'], event: E) {
  if (target) flushSync(() => target.dispatchEvent(event));
}

/**
 * 组合两个事件处理函数（用户的和内部的），并根据事件是否被 `preventDefault()` 决定是否执行第二个处理函数。
 *
 * Compose two event handlers (original and internal), with optional check for `event.defaultPrevented`.
 * Useful in component libraries to merge user-provided event handlers with internal logic safely.
 *
 * @returns 一个新的事件处理函数 / A new composed event handler
 *
 * @example
 * const handleClick = composeEventHandlers(
 *   (e) => console.log('User clicked'),
 *   (e) => console.log('Internal logic'),
 * );
 *
 * <button onClick={handleClick}>Click me</button>
 */
export function composeEventHandlers<E extends { defaultPrevented: boolean }>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    // 执行用户传入的处理函数 / Invoke user handler first
    originalEventHandler?.(event);

    // 如果没有被 preventDefault，则执行内部处理器 / Only run internal handler if event was not prevented
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }

    return null;
  };
}
