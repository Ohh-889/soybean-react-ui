import { Button } from '@/components/button';

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button disabled>
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        Loading...
      </Button>
      <Button
        disabled
        variant="primary"
      >
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        Processing
      </Button>
    </div>
  );
}
