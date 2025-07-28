import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'soybean-react-ui';

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href="/button">Button</Link>
      </Button>

      <Button asChild>
        <Link href="/card">Card</Link>
      </Button>

      <Button asChild>
        <Link href="/tabs">Tabs</Link>
      </Button>

      <a
        className="flex items-center gap-2 border font-medium text-sm justify-center rounded-full border-solid border-transparent transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="Vercel logomark"
          className="dark:invert"
          height={20}
          src="/vercel.svg"
          width={20}
        />
        Deploy now
      </a>
    </div>
  );
}
