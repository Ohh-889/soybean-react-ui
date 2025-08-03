import type { DialogContentProps } from '@radix-ui/react-dialog';

import type { BaseNodeProps, ClassValue } from '@/types/other';

import type { DialogSlots as SheetSlots } from '../dialog/dialog-variants';
import type { DialogProps } from '../dialog/types';

import type { SheetSide } from './sheet-variants';

export interface SheetContentProps extends BaseNodeProps<DialogContentProps> {
  side?: SheetSide;
}

export type SheetClassNames = Partial<Record<SheetSlots, ClassValue>>;

export interface SheetProps extends Omit<DialogProps<SheetContentProps>, 'contentComponent'> {}

export { SheetSide };
