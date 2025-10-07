import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  description: 'A modern, elegant React UI component library',
  title: {
    default: 'Skyroc UI - Modern React Components',
    template: '%s | Skyroc UI'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="zh"
    >
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
