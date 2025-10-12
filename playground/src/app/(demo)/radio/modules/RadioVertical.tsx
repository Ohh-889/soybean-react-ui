import type { RadioGroupProps } from 'skyroc-ui';
import { Card, RadioGroup } from 'skyroc-ui';

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
