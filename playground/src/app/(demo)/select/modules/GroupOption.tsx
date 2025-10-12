import type { SelectProps } from 'skyroc-ui';
import { Card, Select } from 'skyroc-ui';

const items: SelectProps['items'] = [
  {
    children: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ],
    label: 'Group 1'
  },
  { type: 'separator' },
  {
    children: [
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' }
    ],
    label: 'Group 2'
  }
];

const GroupOption = () => {
  return (
    <Card
      split
      title="Group Option"
    >
      <div className="w-[240px] lt-sm:w-auto">
        <Select
          items={items}
          triggerProps={{
            placeholder: 'Please Select'
          }}
        />
      </div>
    </Card>
  );
};

export default GroupOption;
