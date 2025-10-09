// src/components/ui/file-icons.tsx
import { File, FileCode, FileJson, FileJson2Icon, FileText, FileType, FileX } from 'lucide-react';

export function FileIcon({ name }: { name?: string }) {
  const ext = (name?.split('.').pop() || '').toLowerCase();
  const map: Record<string, any> = {
    js: FileJson2Icon,
    json: FileJson,
    jsx: FileCode,
    mdx: FileText,
    ts: FileType,
    tsx: FileX
  };
  const Cmp = map[ext] || File;
  return <Cmp className="size-4 opacity-70" />;
}
