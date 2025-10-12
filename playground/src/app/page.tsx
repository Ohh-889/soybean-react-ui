import Link from 'next/link';
import { Button } from 'skyroc-ui';

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
    </div>
  );
}
