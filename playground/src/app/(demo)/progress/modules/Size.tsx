import type { ProgressProps } from 'soybean-react-ui';
import { Card, Progress } from 'soybean-react-ui';

const sizes: ProgressProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const colors: ProgressProps['color'][] = [
  'primary',
  'destructive',
  'success',
  'warning',
  'info',
  'carbon',
  'secondary',
  'accent'
];

const Size = () => {
  return (
    <Card
      split
      title="Size"
    >
      <div className="flex w-[320px] flex-col gap-[12px] max-sm:w-auto">
        {sizes.map((size, index) => (
          <Progress
            color={colors[index]}
            defaultValue={66}
            key={size}
            size={size}
            value={50}
          />
        ))}
      </div>
    </Card>
  );
};

export default Size;
