'use client';

import cn from 'clsx';
import type { FC, HTMLAttributes } from 'react';

import { CopyToClipboard } from './pre';

export const Code: FC<
  HTMLAttributes<HTMLElement> & {
    'data-copy'?: boolean;
    'data-language'?: string;
  }
> = rest => {
  const { children, className, 'data-copy': copy, 'data-language': language, ...props } = rest;

  console.log('props', rest);

  const isBlock = className?.includes('hljs') || Boolean(language);

  return (
    <code
      dir="ltr"
      {...props}
      style={{ display: 'flex' }}
      className={cn(
        // 共通样式
        'font-mono text-[13px] leading-relaxed',
        'justify-between items-center flex-w',
        'text-gray-800 dark:text-gray-100',

        // 如果是代码块
        isBlock
          ? [
              'block w-full whitespace-pre break-words',
              'bg-transparent',
              'selection:bg-muted selection:text-foreground',
              'before:hidden after:hidden',
              // 行号支持
              'data-line-numbers' in props && '[counter-reset:line]'
            ]
          : [
              // inline code 样式
              'inline rounded-md border border-border/50 bg-muted/40 px-[0.3em] py-[0.15em]',
              'font-mono text-[0.875em] leading-normal text-foreground/90',
              'dark:bg-neutral-800 dark:border-neutral-700'
            ],
        className
      )}
    >
      {children}

      {copy && <CopyToClipboard />}
    </code>
  );
};
