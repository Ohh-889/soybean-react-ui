import { Button } from '@/components/button';

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button>📧 Login with Email</Button>
      <Button variant="outline">⬇️ Download</Button>
      <Button variant="primary">Get Started →</Button>
    </div>
  );
}
