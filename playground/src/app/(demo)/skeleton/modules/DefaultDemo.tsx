import { Card, Skeleton } from 'soybean-react-ui';

const DefaultDemo = () => {
  return (
    <Card
      split
      title="Skeleton"
    >
      <div className="flex items-center space-x-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </Card>
  );
};

export default DefaultDemo;
