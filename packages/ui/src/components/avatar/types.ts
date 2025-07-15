import type {
  AvatarFallbackProps as _AvatarFallbackProps,
  AvatarImageProps as _AvatarImageProps,
  AvatarProps as _AvatarRootProps
} from '@radix-ui/react-avatar';

import type { BaseNodeProps, ClassValue } from '@/types/other';

import type { AvatarSlots } from './avatar-variants';

export type AvatarUi = Partial<Record<AvatarSlots, ClassValue>>;

export interface AvatarRootProps extends BaseNodeProps<_AvatarRootProps> {}

export interface AvatarFallbackProps extends BaseNodeProps<_AvatarFallbackProps> {}

export interface AvatarImageProps extends BaseNodeProps<_AvatarImageProps> {}

export interface AvatarProps extends AvatarImageProps, Pick<AvatarFallbackProps, 'delayMs'> {
  classNames?: AvatarUi;
  fallback?: React.ReactNode;
}
