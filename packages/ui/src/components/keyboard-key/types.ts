import type { ReactNode } from 'react';

import type { BaseComponentProps, ClassValue } from '@/types/other';

import type { KeyboardKeySlots, KeyboardKeyVariant } from './keyboard-key-variants';

export type BuiltinKeyboardKey =
  | 'alt'
  | 'arrowdown'
  | 'arrowleft'
  | 'arrowright'
  | 'arrowup'
  | 'backspace'
  | 'capslock'
  | 'command'
  | 'ctrl'
  | 'delete'
  | 'end'
  | 'enter'
  | 'escape'
  | 'home'
  | 'meta'
  | 'option'
  | 'pagedown'
  | 'pageup'
  | 'shift'
  | 'tab'
  | 'win';

export type SpecificKeyboardKeyMap = {
  alt: string;
  ctrl: string;
  meta: string;
};

export type KeyboardKeyValue = BuiltinKeyboardKey | (string & {});

export interface KeyboardKeyProps<T extends KeyboardKeyValue | KeyboardKeyValue[] = KeyboardKeyValue>
  extends Omit<BaseComponentProps<'div'>, 'children'> {
  children?: (values: string[]) => React.ReactNode;
  value?: T | string[];
  variant?: KeyboardKeyVariant;
}

export type KeyboardKeyClassNames = Partial<Record<KeyboardKeySlots, ClassValue>>;

export interface KeyboardKeyGroupProps<T extends KeyboardKeyValue | KeyboardKeyValue[] = KeyboardKeyValue>
  extends Omit<KeyboardKeyProps, 'children' | 'value'> {
  classNames?: KeyboardKeyClassNames;
  render?: (value: T) => React.ReactNode;
  separator?: ReactNode;
  values: T[];
}

export type { KeyboardKeyVariant };
