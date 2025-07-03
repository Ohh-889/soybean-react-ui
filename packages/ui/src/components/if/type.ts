import type { ReactNode } from 'react';

export interface IfProps {
  /**
   * The children to render
   */
  children?: ReactNode;
  /**
   * If true, the children will be rendered
   */
  condition: boolean;
  /**
   * The fallback to render
   */
  fallback?: ReactNode;
}
