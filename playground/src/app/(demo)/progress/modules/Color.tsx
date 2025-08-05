import type { ProgressProps } from 'soybean-react-ui';
import { Card, Progress } from 'soybean-react-ui';

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

export const Color = () => {
  return (
    <Card
      split
      title="Color"
    >
      <div className="flex w-[320px] flex-col gap-[12px] lt-sm:w-auto">
        {colors.map(color => (
          <Progress
            color={color}
            defaultValue={66}
            key={color}
            value={50}
          />
        ))}
      </div>
    </Card>
  );
};
