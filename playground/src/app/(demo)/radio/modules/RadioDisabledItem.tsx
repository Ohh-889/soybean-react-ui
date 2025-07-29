import type { RadioGroupProps } from 'soybean-react-ui';
import { Card, RadioGroup } from 'soybean-react-ui';

const items: RadioGroupProps['items'] = [
  { id: 'r1', label: 'A', value: '1' },
  { disabled: true, id: 'r2', label: 'B', value: '2' },
  { id: 'r3', label: 'C', value: '3' }
];

const RadioDisabledItem = () => {
  return (
    <Card
      split
      title="Disabled Item"
    >
      <RadioGroup items={items} />
    </Card>
  );
};

export default RadioDisabledItem;
