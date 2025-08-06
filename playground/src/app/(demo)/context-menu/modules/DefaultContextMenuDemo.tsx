'use client';

import { useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import type { DropdownMenuProps } from 'soybean-react-ui';
import { Card, ContextMenu, toast } from 'soybean-react-ui';

import { menus } from '../../dropdown-menu/modules/shared';

function useMenuShortcuts(items: DropdownMenuProps['items'], callback: (key: string, label: string) => void) {
  const isMacOS = useMemo(() => /Macintosh;/.test(typeof navigator !== 'undefined' ? navigator.userAgent : ''), []);

  /** 1) 递归收集所有带 shortcut 的条目（保持稳定顺序即可） */
  const shortcutItems = useMemo(() => {
    const list: Array<{ key: string; label: string }> = [];

    const walk = (arr: typeof items) => {
      arr.forEach(item => {
        if (!item) return;
        if ('shortcut' in item && item.shortcut) {
          const key = Array.isArray(item.shortcut)
            ? item.shortcut.map(k => (isMacOS && k === 'command' ? 'meta' : k)).join('+')
            : item.shortcut;
          list.push({ key, label: item.label as string });
        }
        if ('children' in item && item.children) walk(item.children);
      });
    };

    walk(items);
    return list;
  }, [items]);

  /** 2) 针对每个收集到的快捷键注册 useHotkeys */
  shortcutItems.forEach(({ key, label }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHotkeys(
      key,
      e => {
        e.preventDefault();

        callback(key, label);
      },
      { preventDefault: true }
    );
  });
}

const DefaultDropdownMenuDemo = () => {
  useMenuShortcuts(menus, (key, label) => {
    toast.success(`You pressed ${key} label:${label}`, {
      classNames: {
        title: '!text-xs',
        toast: '!w-auto !px-2 !py-1.5'
      },
      position: 'top-center'
    });
  });

  return (
    <Card
      split
      title="Dropdown Menu"
    >
      <ContextMenu items={menus}>
        <div className="h-50 w-80 max-sm:w-auto flex items-center justify-center border rounded-md border-dashed text-sm">
          Right click here
        </div>
      </ContextMenu>
    </Card>
  );
};

export default DefaultDropdownMenuDemo;
