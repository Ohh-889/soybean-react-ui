'use client';

import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Segment } from '@/components/segment';

import { highlightCode } from '../lib/shiki';

interface Props {
  children: React.ReactNode;

  code: string;
  height?: number | string;
  lang?: string;
  name: string;
  tabs?: { label: string; value: string }[];
  title?: string;
}

const ComponentPreview: React.FC<Props> = ({ children, code, height = 360, lang = 'tsx', name, tabs, title }) => {
  const [active, setActive] = useState(tabs?.[0]?.value ?? 'preview');
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 异步高亮
  useEffect(() => {
    let canceled = false;
    setIsLoading(true);
    highlightCode(code, lang).then(result => {
      console.log('result', result);

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
    <div className="my-8 overflow-hidden prose rounded-lg border border-border/50 bg-background/50 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2 bg-muted/40">
        <span className="font-medium text-sm text-foreground truncate">{title ?? name}</span>
        <Segment
          value={active}
          items={
            tabs ?? [
              { label: 'Preview', value: 'preview' },
              { label: 'Code', value: 'code' }
            ]
          }
          onValueChange={setActive}
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
            {children}
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
              dangerouslySetInnerHTML={{ __html: html }}
              className={cn(
                'h-[calc(100vh-380px)] overflow-auto',
                '[&_pre]:m-0 [&_pre]:whitespace-pre [&_code]:whitespace-pre'
              )}
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

export default ComponentPreview;
