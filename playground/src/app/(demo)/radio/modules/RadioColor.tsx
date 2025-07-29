import type { RadioGroupProps, ThemeColor } from 'soybean-react-ui';
import { Card, RadioGroup } from 'soybean-react-ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

type Props = {
  items: RadioGroupProps['items'];
};

const RadioColor = (props: Props) => {
  const { items } = props;

  return (
    <Card
      split
      title="Color"
    >
      <div className="flex-c gap-[12px]">
        {colors.map(color => (
          <RadioGroup
            color={color}
            items={items}
            key={color}
          />
        ))}
      </div>
    </Card>
  );
};

export default RadioColor;
