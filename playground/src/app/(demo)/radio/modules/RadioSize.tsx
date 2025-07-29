import { Card, RadioGroup } from 'soybean-react-ui';
import type { RadioGroupProps, ThemeSize } from 'soybean-react-ui';

type Props = {
  items: RadioGroupProps['items'];
};

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const RadioSize = (props: Props) => {
  const { items } = props;

  return (
    <Card
      split
      title="Size"
    >
      <div className="flex-c gap-[12px]">
        {sizes.map(size => (
          <RadioGroup
            items={items}
            key={size}
            size={size}
          />
        ))}
      </div>
    </Card>
  );
};

export default RadioSize;
