import { ArrowRight, Package, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 pt-24 pb-32 sm:pt-32 sm:pb-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.950),theme(colors.gray.900))] opacity-20" />

          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium mb-8">
              <Sparkles className="size-4 text-[hsl(var(--accent))]" />
              <span>现代化 React 组件库</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              优雅、简洁
              <br />
              <span className="bg-gradient-to-r from-[hsl(237,100%,70%)] to-[hsl(237,100%,85%)] bg-clip-text text-transparent">
                Skyroc UI
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed">
              一套精心设计的 React 组件库，助力你快速构建优雅的现代化 Web 应用。
              <br />
              基于 Tailwind CSS，完全可定制，开箱即用。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(237,100%,70%)] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/50 hover:bg-[hsl(237,100%,75%)] transition-all hover:scale-105"
                href="/docs"
              >
                开始使用
                <ArrowRight className="size-4" />
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-8 py-3 text-sm font-semibold hover:bg-muted transition-colors"
                href="/docs/components/button"
              >
                浏览组件
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-border bg-background p-8 hover:shadow-lg transition-shadow">
                <div className="size-12 rounded-lg bg-gradient-to-br from-[hsl(237,100%,70%)] to-[hsl(237,100%,85%)] flex items-center justify-center mb-4">
                  <Zap className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">开箱即用</h3>
                <p className="text-muted-foreground leading-relaxed">
                  精心设计的组件，无需额外配置，直接导入即可使用，提升开发效率。
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-8 hover:shadow-lg transition-shadow">
                <div className="size-12 rounded-lg bg-gradient-to-br from-[hsl(237,100%,70%)] to-[hsl(237,100%,85%)] flex items-center justify-center mb-4">
                  <Package className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">完全可定制</h3>
                <p className="text-muted-foreground leading-relaxed">
                  基于 Tailwind CSS 构建，支持主题定制，轻松适配你的设计系统。
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-8 hover:shadow-lg transition-shadow">
                <div className="size-12 rounded-lg bg-gradient-to-br from-[hsl(237,100%,70%)] to-[hsl(237,100%,85%)] flex items-center justify-center mb-4">
                  <Sparkles className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">现代化设计</h3>
                <p className="text-muted-foreground leading-relaxed">
                  遵循最新设计趋势，提供优雅简洁的视觉体验，支持深色模式。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">开始构建你的应用</h2>
            <p className="text-lg text-muted-foreground mb-8">阅读文档，了解如何使用 Skyroc UI 构建优雅的用户界面</p>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(237,100%,70%)] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/50 hover:bg-[hsl(237,100%,75%)] transition-all hover:scale-105"
              href="/docs"
            >
              查看文档
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 px-6 py-12">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Skyroc UI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              href="/docs"
            >
              文档
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              href="/docs/components/button"
            >
              组件
            </Link>
            <a
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              href="https://github.com"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
