import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-6 py-8 md:px-12 md:py-12 max-w-4xl">{children}</main>
      </div>
    </div>
  );
}
