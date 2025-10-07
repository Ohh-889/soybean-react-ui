'use client';

import { Code, Eye } from 'lucide-react';
import { useState } from 'react';

interface ComponentPreviewProps {
  children: React.ReactNode;
  code?: string;
}

export function ComponentPreview({ children, code }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between bg-muted/30 px-4 py-2 border-b border-border">
        <span className="text-sm font-medium text-muted-foreground">预览</span>
        <div className="flex gap-1">
          <button
            className={`p-2 rounded-md transition-colors ${
              !showCode ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setShowCode(false)}
          >
            <Eye className="size-4" />
          </button>
          {code && (
            <button
              className={`p-2 rounded-md transition-colors ${
                showCode ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setShowCode(true)}
            >
              <Code className="size-4" />
            </button>
          )}
        </div>
      </div>

      {!showCode ? (
        <div className="p-8 bg-background flex items-center justify-center min-h-[200px]">{children}</div>
      ) : (
        <div className="bg-muted/20">
          <pre className="p-4 overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
