import type {
  AvatarFallbackProps as _AvatarFallbackProps,
  AvatarImageProps as _AvatarImageProps,
  AvatarProps as _AvatarRootProps
} from '@radix-ui/react-avatar';
import type { AvatarSlots } from '@soybean-react-ui/variants';

import type { BaseNodeProps, ClassValue } from '../../types/other';

export type AvatarUi = Partial<Record<AvatarSlots, ClassValue>>;

export type AvatarRootProps = BaseNodeProps<_AvatarRootProps>;

export type AvatarFallbackProps = BaseNodeProps<_AvatarFallbackProps>;

export type AvatarImageProps = BaseNodeProps<_AvatarImageProps>;

export interface AvatarProps extends AvatarImageProps, Pick<AvatarFallbackProps, 'delayMs'> {
  classNames?: AvatarUi;
  fallback?: React.ReactNode;
}
