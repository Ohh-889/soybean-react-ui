'use client';

import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Segment } from '@/components/s';

import { highlight } from '../lib/shiki';

interface Props {
  code: string;
  demo: React.ReactNode;
  height?: number | string;
  lang?: string;
  name: string;
  tabs?: { label: string; value: string }[];
  title?: string;
}

export const ComponentPreview: React.FC<Props> = ({ code, demo, height = 360, lang = 'tsx', name, tabs, title }) => {
  const [active, setActive] = useState(tabs?.[0]?.value ?? 'preview');
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 异步高亮
  useEffect(() => {
    let canceled = false;
    setIsLoading(true);
    highlight(code.trim(), lang).then(result => {
      if (!canceled) {
        setHtml(result);
        setIsLoading(false);
      }
    });
    return () => {
      canceled = true;
    };
  }, [code, lang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error('Copy failed');
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-border/50 bg-background/50 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2 bg-muted/40">
        <span className="font-medium text-sm text-foreground truncate">{title ?? name}</span>
        <Segment
          value={active}
          options={
            tabs ?? [
              { label: 'Preview', value: 'preview' },
              { label: 'Code', value: 'code' }
            ]
          }
          onChange={setActive}
        />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {active === 'preview' ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center bg-card"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: 10 }}
            key="preview"
            style={{ height }}
            transition={{ duration: 0.2 }}
          >
            {demo}
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-background"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: 10 }}
            key="code"
            transition={{ duration: 0.2 }}
          >
            {/* Copy */}
            <button
              title="Copy code"
              className={cn(
                'absolute right-3 top-3 z-10 p-1.5 rounded-md border border-border/50',
                'bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>

            {/* Code */}
            <div
              className="overflow-auto text-sm leading-relaxed font-mono not-prose p-4"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                Loading code...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
