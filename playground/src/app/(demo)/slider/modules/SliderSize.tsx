import type { ThemeColor, ThemeSize } from 'skyroc-ui';
import { Card, Slider } from 'skyroc-ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const SliderSize = () => {
  return (
    <Card
      split
      title="Size"
    >
      <div className="w-[480px] flex flex-c-stretch gap-6 max-sm:w-auto">
        {sizes.map((size, index) => (
          <Slider
            color={colors[index]}
            defaultValue={[33]}
            key={size}
            max={100}
            size={size}
            step={1}
          />
        ))}
      </div>
    </Card>
  );
};

export default SliderSize;
