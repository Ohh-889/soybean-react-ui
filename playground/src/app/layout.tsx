import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../css/globals.css';
import { Card, Sonner } from 'soybean-react-ui';

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
          >
            {children}
          </Card>
        </div>

        <Sonner />
      </body>
    </html>
  );
}
