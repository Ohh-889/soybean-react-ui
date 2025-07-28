import type { ReactNode } from 'react';

import type { BaseComponentProps, ClassValue } from '@/types/other';

import type { TextareaSlots } from './textarea-variants';

export interface TextareaContentProps extends BaseComponentProps<'textarea'> {}

export type TextareaClassNames = Partial<Record<TextareaSlots, ClassValue>>;

export interface TextareaCountProps
  extends Omit<BaseComponentProps<'div'>, 'children'>,
    Pick<TextareaContentProps, 'maxLength' | 'value'> {
  children?: (count: string) => ReactNode;
  countGraphemes?: (input: TextareaContentProps['value']) => number;
}

export interface TextareaRootProps extends BaseComponentProps<'div'> {}

export interface TextareaProps extends TextareaContentProps, Pick<TextareaCountProps, 'countGraphemes'> {
  classNames?: TextareaClassNames;
  countRender?: (count: string) => ReactNode;
  onTextChange?: (value: TextareaContentProps['value']) => void;
  showCount?: boolean;
}
