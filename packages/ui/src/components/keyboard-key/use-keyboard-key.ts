'use client';

import { useEffect, useState } from 'react';

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

export interface KeyboardKeyProps {
  value: string;
}

type SpecificKeyboardKeyMap = {
  alt: string;
  ctrl: string;
  meta: string;
};

export const builtinKeyboardKeyMap: Record<BuiltinKeyboardKey, string> = {
  alt: '',
  arrowdown: '↓',
  arrowleft: '←',
  arrowright: '→',
  arrowup: '↑',
  backspace: '⌫',
  capslock: '⇪',
  command: '⌘',
  ctrl: '',
  delete: '⌦',
  end: '↘',
  enter: '↵',
  escape: '⎋',
  home: '↖',
  meta: '',
  option: '⌥',
  pagedown: '⇟',
  pageup: '⇞',
  shift: '⇧',
  tab: '⇥',
  win: '⊞'
};

/* ------------------------------------------------------------------ */
/*                               Hook                                 */
/* ------------------------------------------------------------------ */
export function useKeyboardKey() {
  const [isMacOS, setIsMacOS] = useState(false);

  const specificMapRef: SpecificKeyboardKeyMap = {
    alt: isMacOS ? builtinKeyboardKeyMap.option : 'alt',
    ctrl: isMacOS ? '⌃' : 'ctrl',
    meta: isMacOS ? builtinKeyboardKeyMap.command : builtinKeyboardKeyMap.win
  };

  const getKeyboardKey = (value?: KeyboardKeyProps['value']) => {
    if (!value) return '';

    if (value === 'meta' || value === 'alt' || value === 'ctrl') {
      return specificMapRef[value as keyof SpecificKeyboardKeyMap];
    }

    return builtinKeyboardKeyMap[value as BuiltinKeyboardKey] || value.toUpperCase();
  };

  useEffect(() => {
    setIsMacOS(/Macintosh;/.test(navigator.userAgent));
  }, []);

  return {
    getKeyboardKey,
    isMacOS
  };
}
