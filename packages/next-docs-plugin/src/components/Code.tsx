'use client';

import cn from 'clsx';
import type { FC, HTMLAttributes, MouseEvent } from 'react';

import CopyButton from './CopyButton';

const Code: FC<
  HTMLAttributes<HTMLElement> & {
    'data-copy'?: boolean;
    'data-language'?: string;
    'data-show-line-numbers'?: boolean;
  }
> = rest => {
  const {
    children,
    className,
    'data-copy': copy,
    'data-language': language,
    'data-show-line-numbers': showLineNumbers,
    ...props
  } = rest;

  const isBlock = className?.includes('hljs') || Boolean(language);

  function getContent(event: MouseEvent<HTMLButtonElement>) {
    const container = event.currentTarget.closest('.code-block');
    return container?.querySelector('pre code')?.textContent ?? '';
  }

  return (
    <code
      dir="ltr"
      {...props}
      style={{ display: 'grid' }}
      className={cn(
        'font-mono text-[13px] leading-relaxed',
        'justify-between items-center flex-wrap',
        'text-gray-800 dark:text-gray-100',

        isBlock
          ? [
              'block w-full whitespace-pre break-words',
              'bg-transparent',
              'selection:bg-muted selection:text-foreground',
              'before:hidden after:hidden',
              showLineNumbers && '[counter-reset:line]'
              // 行号支持
            ]
          : [
              // inline code 样式
              'inline rounded-md  bg-muted/40 px-[0.3em] py-[0.15em]',
              'font-mono text-[0.875em] leading-normal text-foreground/90',
              'dark:bg-neutral-800 dark:border-neutral-700'
            ],
        className
      )}
    >
      {children}

      {copy && <CopyButton getContent={getContent} />}
    </code>
  );
};

export default Code;
