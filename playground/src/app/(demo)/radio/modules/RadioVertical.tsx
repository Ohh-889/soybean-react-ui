import type { RadioGroupProps } from 'soybean-react-ui';
import { Card, RadioGroup } from 'soybean-react-ui';

type Props = {
  items: RadioGroupProps['items'];
};

const RadioVertical = (props: Props) => {
  const { items } = props;

  return (
    <Card
      split
      title="Orientation: Vertical"
    >
      <RadioGroup
        items={items}
        orientation="vertical"
      />
    </Card>
  );
};

export default RadioVertical;
