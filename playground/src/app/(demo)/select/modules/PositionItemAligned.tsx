import { Apple, Banana, Cherry, Ear, Link2Icon } from 'lucide-react';
import type { SelectProps } from 'soybean-react-ui';
import { Card, Select } from 'soybean-react-ui';

const fruits: SelectProps['items'] = [
  { label: 'Apple', leading: <Apple />, trailing: <Link2Icon className="size-4" />, value: 'apple' },
  { label: 'Banana', leading: <Banana />, value: 'banana' },
  { label: 'Cherry', leading: <Cherry />, value: 'cherry' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pear', leading: <Ear />, value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' }
];

const PositionItemAligned = () => {
  return (
    <Card
      split
      title="Position Item Aligned"
    >
      <div className="w-[240px] lt-sm:w-auto">
        <Select
          items={fruits}
          contentProps={{
            position: 'item-aligned'
          }}
          triggerProps={{
            placeholder: 'Please select a fruit'
          }}
        />
      </div>
    </Card>
  );
};

export default PositionItemAligned;
