import type { IfProps } from '../type';

function If({ children, condition, fallback }: IfProps) {
  return condition ? children : fallback;
}

export default If;
