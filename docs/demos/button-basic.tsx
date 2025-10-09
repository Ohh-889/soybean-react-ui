import { Button } from '@/components/button';

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button>默认按钮</Button>
      <Button variant="primary">主要按钮</Button>
      <Button variant="outline">次要按钮</Button>
    </div>
  );
}
