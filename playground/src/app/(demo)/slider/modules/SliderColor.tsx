import type { ThemeColor } from 'skyroc-ui';
import { Card, Slider } from 'skyroc-ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

const SliderColor = () => {
  return (
    <Card
      split
      title="Color"
    >
      <div className="w-[480px] flex flex-c-stretch gap-6 max-sm:w-auto">
        {colors.map(color => (
          <Slider
            color={color}
            defaultValue={[33]}
            key={color}
            max={100}
            step={1}
          />
        ))}
      </div>
    </Card>
  );
};

export default SliderColor;
