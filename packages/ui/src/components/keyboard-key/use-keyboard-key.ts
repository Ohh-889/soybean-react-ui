'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

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

/* ---------- 静态映射 ---------- */
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
  const isMacOS = useMemo(() => /Macintosh;/.test(typeof navigator !== 'undefined' ? navigator.userAgent : ''), []);

  const specificMapRef = useRef<SpecificKeyboardKeyMap>({
    alt: ' ',
    ctrl: ' ',
    meta: ' '
  });

  useEffect(() => {
    const m = specificMapRef.current;
    m.meta = isMacOS ? builtinKeyboardKeyMap.command : builtinKeyboardKeyMap.win;
    m.alt = isMacOS ? builtinKeyboardKeyMap.option : 'alt';
    m.ctrl = isMacOS ? '⌃' : 'ctrl';
  }, [isMacOS]);

  const getKeyboardKey = useCallback((value?: KeyboardKeyProps['value']) => {
    if (!value) return '';

    if (value === 'meta' || value === 'alt' || value === 'ctrl') {
      return specificMapRef.current[value as keyof SpecificKeyboardKeyMap];
    }

    return (builtinKeyboardKeyMap as any)[value] || value.toUpperCase();
  }, []);

  return {
    getKeyboardKey,
    isMacOS
  };
}
