import { Card, Skeleton } from 'skyroc-ui';

const DefaultDemo = () => {
  return (
    <Card
      split
      title="Skeleton"
    >
      <div className="flex items-center space-x-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] max-sm:w-[150px]" />
          <Skeleton className="h-4 w-[200px] max-sm:w-auto" />
        </div>
      </div>
    </Card>
  );
};

export default DefaultDemo;
