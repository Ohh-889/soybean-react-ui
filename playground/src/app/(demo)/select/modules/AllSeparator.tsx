import type { SelectProps } from 'soybean-react-ui';
import { Card, Select } from 'soybean-react-ui';

const fruits: SelectProps['items'] = [
  { label: 'Apple', value: 'apple' },
  { type: 'separator' },
  { label: 'Banana', value: 'banana' },
  { type: 'separator' },
  { label: 'Cherry', value: 'cherry' },
  { type: 'separator' },
  { label: 'Orange', value: 'orange' },
  { type: 'separator' },
  { label: 'Pear', value: 'pear' },
  { type: 'separator' },
  { label: 'Plum', value: 'plum' },
  { label: 'Strawberry', value: 'strawberry' },
  { type: 'separator' },
  { label: 'Watermelon', value: 'watermelon' }
];

const AllSeparator = () => {
  return (
    <Card
      split
      title="Separator"
    >
      <div className="w-[240px] lt-sm:w-auto">
        <Select
          items={fruits}
          triggerProps={{
            placeholder: 'Please select a fruit'
          }}
        />
      </div>
    </Card>
  );
};

export default AllSeparator;
