import type { SelectProps } from 'soybean-react-ui';
import { Card, Select } from 'soybean-react-ui';

const fruits: SelectProps['items'] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pear', value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' }
];

const DefaultValue = () => {
  return (
    <Card
      split
      title="With default value"
    >
      <div className="w-[240px] lt-sm:w-auto">
        <Select
          defaultValue="cherry"
          items={fruits}
          triggerProps={{
            placeholder: 'Please select a fruit'
          }}
        />
      </div>
    </Card>
  );
};

export default DefaultValue;
