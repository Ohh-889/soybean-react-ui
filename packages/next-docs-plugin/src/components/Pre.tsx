'use client';

import cn from 'clsx';
import { Check, Copy, WrapText } from 'lucide-react';
import { type FC, type HTMLAttributes, type MouseEvent, type ReactNode, useEffect, useState } from 'react';
import type { ButtonProps } from 'soybean-react-ui';
import { Button } from 'soybean-react-ui';

/* -------------------- ToggleWordWrapButton -------------------- */
function toggleWordWrap() {
  const htmlDataset = document.documentElement.dataset;
  if ('nextraWordWrap' in htmlDataset) delete htmlDataset.nextraWordWrap;
  else htmlDataset.nextraWordWrap = '';
}

export const ToggleWordWrapButton: FC<{ children?: ReactNode }> = ({ children }) => (
  <Button
    className="flex items-center gap-1 rounded-md border border-border/50 bg-transparent hover:bg-muted"
    size="sm"
    title="切换自动换行"
    variant="outline"
    onClick={toggleWordWrap}
  >
    {children ?? <WrapText size={16} />}
  </Button>
);

/* -------------------- Pre 组件 -------------------- */
export interface PreProps extends HTMLAttributes<HTMLPreElement> {
  'data-copy'?: '';
  'data-filename'?: string;
  'data-language'?: string;
  'data-word-wrap'?: '';
  icon?: ReactNode;
}

export const Pre: FC<PreProps> = rest => {
  const {
    children,
    className,
    'data-copy': copy,
    'data-filename': filename,
    'data-language': _lang,
    'data-word-wrap': hasWordWrap,
    icon,
    ...props
  } = rest;

  const copyButton = copy === '' && <CopyToClipboard />;

  return (
    <div className="code-block relative my-6 w-full">
      {/* 文件名栏 */}
      {filename && (
        <div
          className={cn(
            'flex items-center justify-between gap-2 rounded-t-md border border-border/50 border-b-0',
            'bg-gray-100 dark:bg-neutral-900 px-4 py-2 text-xs text-gray-700 dark:text-gray-200'
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            {icon}
            <span className="truncate">{filename}</span>
          </div>
          {copyButton}
        </div>
      )}

      {/* 代码区 */}
      <div
        className={cn(
          'relative group rounded-b-md border border-border/50 bg-white dark:bg-black',
          filename ? 'rounded-t-none' : 'rounded-md'
        )}
      >
        {/* hover 按钮区 */}
        <div
          className={cn(
            'absolute right-3 flex gap-2 transition-opacity',
            'opacity-0 group-hover:opacity-100 focus-within:opacity-100',
            filename ? 'top-3' : 'top-3'
          )}
        >
          {hasWordWrap === '' && <ToggleWordWrapButton />}
          {!filename && copyButton}
        </div>

        <pre
          className={cn(
            'overflow-x-auto p-4 text-sm leading-relaxed subpixel-antialiased not-prose',
            'bg-transparent text-foreground dark:text-foreground/90',
            'font-mono',
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
};
