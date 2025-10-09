'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  {
    items: [
      { href: '/docs', title: '介绍' },
      { href: '/docs/installation', title: '安装' },
      { href: '/docs/quick-start', title: '快速开始' }
    ],
    title: '开始'
  },
  {
    items: [
      { href: '/docs/components/button', title: 'Button 按钮' },
      { href: '/docs/components/button-new', title: 'Button 编译时 Demo' },
      { href: '/docs/components/input', title: 'Input 输入框' },
      { href: '/docs/components/card', title: 'Card 卡片' },
      { href: '/docs/components/badge', title: 'Badge 徽章' },
      { href: '/docs/components/alert', title: 'Alert 警告' },
      { href: '/docs/components/avatar', title: 'Avatar 头像' },
      { href: '/docs/components/dialog', title: 'Dialog 对话框' },
      { href: '/docs/components/checkbox', title: 'Checkbox 复选框' },
      { href: '/docs/components/select', title: 'Select 选择器' },
      { href: '/docs/components/switch', title: 'Switch 开关' }
    ],
    title: '组件'
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border/40 bg-background py-8 hidden md:block">
      <nav className="px-6 space-y-8">
        {navigation.map(section => (
          <div key={section.title}>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map(item => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                        isActive
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {isActive && <ChevronRight className="size-4 text-[hsl(var(--accent))]" />}
                      <span className={isActive ? '' : 'ml-6'}>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
