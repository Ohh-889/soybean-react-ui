import { Card, RadioGroup } from 'skyroc-ui';
import type { RadioGroupProps } from 'skyroc-ui';

type Props = {
  items: RadioGroupProps['items'];
};

const RadioDisabledAll = (props: Props) => {
  const { items } = props;

  return (
    <Card
      split
      title="Disabled All"
    >
      <RadioGroup
        disabled
        items={items}
      />
    </Card>
  );
};

export default RadioDisabledAll;
