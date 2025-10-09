'use client';
/* eslint-disable complexity */
// src/components/mdx/DemoFrame.tsx
import { Check, ChevronsDown, ChevronsUp, Copy, Link as LinkIcon, List, ListOrdered, WrapText } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Segment } from '@/components/segment';
import { cn } from '@/lib/utils';

import { loadPrefs, savePrefs } from '../lib/pref';
import { highlightCode } from '../lib/shiki';

import { FileIcon } from './FileIcon';

type DemoImporter = () => Promise<{ default: React.ComponentType<any> }>;

export function DemoFrame({
  abs,
  children,
  code,
  collapseAt = 18,
  collapsible = true,
  defaultShowNumbers,
  defaultTab,
  defaultWrap,
  filename,
  highlight,
  lang = 'tsx',
  title
}: {
  abs?: string;
  children: React.ReactNode;
  code: string;
  collapseAt?: number;
  collapsible?: boolean;
  defaultShowNumbers?: boolean;
  defaultTab?: 'code' | 'preview';
  defaultWrap?: boolean;
  filename?: string;
  highlight?: string;
  lang?: string;
  title?: string;
}) {
  const initial =
    typeof window !== 'undefined'
      ? loadPrefs()
      : { numbers: defaultShowNumbers ?? true, tab: defaultTab ?? 'preview', wrap: defaultWrap ?? false };

  const [active, setActive] = useState<'code' | 'preview'>(defaultTab ?? initial.tab ?? 'preview');
  const [showNumbers, setShowNumbers] = useState<boolean>(defaultShowNumbers ?? initial.numbers ?? true);
  const [wrap, setWrap] = useState<boolean>(defaultWrap ?? initial.wrap ?? false);
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const [collapsed, setCollapsed] = useState(collapsible && lineCount > collapseAt);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let canceled = false;
    (async () => {
      const h = await highlightCode(code, lang, { highlight });
      if (!canceled) setHtml(h);
    })();
    return () => {
      canceled = true;
    };
  }, [code, lang, highlight]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    savePrefs({ numbers: showNumbers, tab: active, wrap });
  }, [active, showNumbers, wrap]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!viewerRef.current) return;
      if (!viewerRef.current.contains(document.activeElement)) return;
      if (e.key === 'w') setWrap(v => !v);
      if (e.key === 'n') setShowNumbers(v => !v);
      if (e.key === 'p') setActive('preview');
      if (e.key === 'o') setActive('code');
      if (e.key === 'c' && active === 'code') {
        navigator.clipboard.writeText(code).then(() => setCopied(true));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, code]);

  const copyLineLink = () => {
    if (!viewerRef.current) return;
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const container = viewerRef.current;
    const lineFromNode = (node: Node | null): number | null => {
      while (node && node !== container) {
        if (node instanceof HTMLElement && node.hasAttribute('data-lineno')) {
          return Number(node.getAttribute('data-lineno'));
        }
        node = node.parentNode;
      }
      return null;
    };
    const start = lineFromNode(range.startContainer);
    const end = lineFromNode(range.endContainer);
    if (!start || !end) return;
    const a = Math.min(start, end);
    const b = Math.max(start, end);
    const url = new URL(window.location.href);
    url.hash = a === b ? `L${a}` : `L${a}-L${b}`;
    navigator.clipboard.writeText(url.toString()).then(() => setCopied(true));
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border/50 bg-background/50 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <div className="truncate text-sm font-medium">{title ?? 'Demo'}</div>
        <div className="flex items-center gap-2">
          <Segment
            value={active}
            items={[
              { label: 'Preview', value: 'preview' },
              { label: 'Code', value: 'code' }
            ]}
            onValueChange={setActive}
          />
        </div>
      </div>

      {active === 'preview' ? (
        <ErrorBoundary fallbackRender={() => <div>Error</div>}>
          <div className="bg-card p-6">{children}</div>
        </ErrorBoundary>
      ) : (
        <div className="relative">
          <div className="code-header">
            <div className="flex items-center gap-2">
              {filename && <FileIcon name={filename} />}
              <span className="truncate">{filename ?? title ?? 'Code'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-md border border-border/50 bg-muted/30 p-1.5 text-muted-foreground hover:bg-muted"
                title={wrap ? '关闭自动换行 (w)' : '开启自动换行 (w)'}
                onClick={() => setWrap(v => !v)}
              >
                <WrapText size={16} />
              </button>
              <button
                className="rounded-md border border-border/50 bg-muted/30 p-1.5 text-muted-foreground hover:bg-muted"
                title={showNumbers ? '隐藏行号 (n)' : '显示行号 (n)'}
                onClick={() => setShowNumbers(v => !v)}
              >
                {showNumbers ? <List size={16} /> : <ListOrdered size={16} />}
              </button>
              <button
                className="rounded-md border border-border/50 bg-muted/30 p-1.5 text-muted-foreground hover:bg-muted"
                title="复制行链接"
                onClick={copyLineLink}
              >
                <LinkIcon size={16} />
              </button>
              <button
                className="rounded-md border border-border/50 bg-muted/30 p-1.5 text-muted-foreground hover:bg-muted"
                title="复制代码 (c)"
                onClick={async () => {
                  await navigator.clipboard.writeText(code);
                  setCopied(true);
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div
            ref={viewerRef}
            tabIndex={0}
            className={cn(
              'code-viewer overflow-auto p-4 font-mono text-sm leading-relaxed not-prose',
              showNumbers && 'show-line-numbers',
              wrap && 'wrap'
            )}
            style={
              collapsed
                ? { maskImage: 'linear-gradient(to bottom, black 80%, transparent)', maxHeight: 360 }
                : undefined
            }
          >
            <div
              className="[&_pre]:m-0 [&_pre]:whitespace-pre [&_code]:whitespace-pre"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          {collapsible && lineCount > collapseAt && (
            <div className="flex items-center justify-center border-t border-border/50 bg-gradient-to-b from-transparent to-background p-2">
              <button
                className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
                onClick={() => setCollapsed(v => !v)}
              >
                {collapsed ? (
                  <>
                    <ChevronsDown size={14} /> 展开代码
                  </>
                ) : (
                  <>
                    <ChevronsUp size={14} /> 收起代码
                  </>
                )}
              </button>
            </div>
          )}

          {copied && (
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/75 px-3 py-1.5 text-xs text-white shadow-lg">
              已复制
            </div>
          )}
        </div>
      )}
    </div>
  );
}
