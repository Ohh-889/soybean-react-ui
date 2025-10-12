import { Apple, Banana, Cherry, Ear, Link2Icon } from 'lucide-react';
import type { SelectProps } from 'skyroc-ui';
import { Card, Select } from 'skyroc-ui';

const fruits: SelectProps['items'] = [
  { label: 'Apple', leading: <Apple />, trailing: <Link2Icon className="size-4" />, value: 'apple' },
  { label: 'Banana', leading: <Banana />, value: 'banana' },
  { disabled: true, label: 'Cherry', leading: <Cherry />, value: 'cherry' },
  { label: 'Orange', value: 'orange' },
  { disabled: true, label: 'Pear', leading: <Ear />, value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' }
];

const DisabledOption = () => {
  return (
    <Card
      split
      title="Disabled Option"
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

export default DisabledOption;
