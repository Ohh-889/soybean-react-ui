import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../css/globals.css';
import Link from 'next/link';
import { ButtonIcon, Card, Icon, Popover, Sonner } from 'soybean-react-ui';

import ThemeCustomize from '../components/ThemeCustomize';
import config from '../config';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans'
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  description: 'soybean-react-ui playground',
  title: 'Soybean React UI'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        id="app"
      >
        <div className="h-full">
          <Card
            flexHeight
            className="h-full max-sm:h-auto"
            title="Soybean UI Components"
            extra={
              <div className="flex items-center gap-3">
                <Popover
                  align="end"
                  classNames={{ content: 'z-15' }}
                  side="bottom"
                  trigger={
                    <ButtonIcon
                      icon="lucide:swatch-book"
                      size="lg"
                    />
                  }
                >
                  <ThemeCustomize />
                </Popover>

                <ButtonIcon
                  asChild
                  size="lg"
                >
                  <Link
                    href={config.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon icon="lucide:github" />
                  </Link>
                </ButtonIcon>
              </div>
            }
          >
            {children}
          </Card>
        </div>

        <Sonner />
      </body>
    </html>
  );
}
