'use client';

import { Github, Menu, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            className="flex items-center gap-2 font-semibold text-lg tracking-tight"
            href="/"
          >
            <div className="size-8 rounded-lg bg-gradient-to-br from-[hsl(237,100%,70%)] to-[hsl(237,100%,85%)] flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span>Skyroc UI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/docs"
            >
              文档
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/docs/components/button"
            >
              组件
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            className="hidden sm:flex size-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
            href="https://github.com/yourusername/skyroc-ui"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="size-5" />
          </a>

          <button
            className="size-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          <button
            className="md:hidden size-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background p-4">
          <div className="flex flex-col gap-3">
            <Link
              className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
            >
              文档
            </Link>
            <Link
              className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              href="/docs/components/button"
              onClick={() => setMobileMenuOpen(false)}
            >
              组件
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
