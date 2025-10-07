'use client';

import { Link } from 'lucide-react';

export function HeadingAnchor({ id }: { id: string }) {
  const handleClick = () => {
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.pushState({}, '', url);
    navigator.clipboard.writeText(url.href);
  };

  return (
    <a
      aria-label={`链接到 ${id}`}
      className="ml-2 inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
      href={`#${id}`}
      onClick={handleClick}
    >
      <Link className="size-4 text-muted-foreground hover:text-[hsl(237,100%,70%)] transition-colors" />
    </a>
  );
}
