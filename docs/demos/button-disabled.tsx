import { Button } from '@/components/button';

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button disabled>Disabled Button</Button>
      <Button
        disabled
        variant="primary"
      >
        Disabled Primary
      </Button>
      <Button
        disabled
        variant="outline"
      >
        Disabled Outline
      </Button>
    </div>
  );
}
