import type { BaseNodeProps, ThemeColor } from '@/types/other';

import type { BadgeShape, BadgeVariant } from './badge-variants';

export interface BadgeProps extends BaseNodeProps<React.ComponentProps<'div'>> {
  /** The color of the badge. */
  color?: ThemeColor;
  /** The shape of the badge. */
  shape?: BadgeShape;
  /** The variant of the badge. */
  variant?: BadgeVariant;
}

export type { BadgeShape, BadgeVariant };
