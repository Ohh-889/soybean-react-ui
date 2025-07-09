import type { BadgeShape, BadgeVariant, ThemeColor } from '@soybean-react-ui/variants';

import type { BaseNodeProps } from '../../types/other';

export interface BadgeProps extends BaseNodeProps<React.ComponentProps<'div'>> {
  /** The color of the badge. */
  color?: ThemeColor;
  /** The shape of the badge. */
  shape?: BadgeShape;
  /** The variant of the badge. */
  variant?: BadgeVariant;
}

export type { BadgeShape, BadgeVariant };
