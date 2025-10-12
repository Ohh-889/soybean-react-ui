import type { ProgressProps } from 'skyroc-ui';
import { Card, Progress } from 'skyroc-ui';

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

const Color = () => {
  return (
    <Card
      split
      title="Color"
    >
      <div className="flex w-[320px] flex-col gap-[12px] max-sm:w-auto">
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

export default Color;
