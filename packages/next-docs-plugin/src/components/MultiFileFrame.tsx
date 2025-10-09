'use client';

import cn from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import { Segment } from '@/components/segment';

import { highlightCode } from '../lib/shiki';

import { FileIcon } from './FileIcon';

function MultiFileFrame({
  abs,
  files,
  highlight,
  title
}: {
  abs?: string;
  files: Record<string, { code: string; lang: string; title?: string }>;
  highlight?: string;
  title: string;
}) {
  'use client';
  const keys = Object.keys(files);
  const [active, setActive] = useState<'code' | 'preview'>('preview');
  const [file, setFile] = useState<string>(keys[0]);

  const current = files[file];
  const [html, setHtml] = useState('');

  useEffect(() => {
    let canceled = false;
    (async () => {
      const h = await highlightCode(current.code, current.lang, { highlight });
      if (!canceled) setHtml(h);
    })();
    return () => {
      canceled = true;
    };
  }, [file, current.code, current.lang, highlight]);

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border/50 bg-background/50 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 px-4 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="truncate text-sm font-medium">{title}</span>
          {/* 文件 tabs */}
          <div className="flex max-w-full overflow-auto rounded-md border border-border/50">
            {keys.map(k => (
              <button
                key={k}
                className={cn(
                  'flex items-center gap-2 truncate px-3 py-1.5 text-xs',
                  file === k ? 'bg-background' : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => setFile(k)}
              >
                <FileIcon name={files[k].title} />
                <span className="truncate">{files[k].title}</span>
              </button>
            ))}
          </div>
        </div>
        <Segment
          value={active}
          items={[
            { label: 'Preview', value: 'preview' },
            { label: 'Code', value: 'code' }
          ]}
          onValueChange={v => setActive(v as any)}
        />
      </div>

      {active === 'preview' ? (
        <div className="bg-card p-6" />
      ) : (
        <div className="code-viewer show-line-numbers overflow-auto p-4 font-mono text-sm leading-relaxed not-prose">
          <div
            className="[&_pre]:m-0 [&_pre]:whitespace-pre [&_code]:whitespace-pre"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </div>
  );
}

export default MultiFileFrame;
