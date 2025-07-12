import type { ThemeColor, ThemeSize } from 'soybean-react-ui';
import { Card, Checkbox } from 'soybean-react-ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const items = [
  { label: 'A', value: '1' },
  { label: 'B', value: '2' },
  { label: 'C', value: '3' }
];

const CheckboxPage = () => {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Color"
      >
        <div className="flex flex-wrap gap-[12px]">
          {colors.map(color => (
            <Checkbox
              color={color}
              id={color}
              key={color}
            >
              {color}
            </Checkbox>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Size"
      >
        <div className="flex flex-wrap gap-[12px]">
          {sizes.map(size => (
            <Checkbox
              checked="indeterminate"
              key={size}
              size={size}
            >
              {size}
            </Checkbox>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Disabled"
      >
        {items.map(item => (
          <Checkbox
            disabled
            defaultChecked={item.value === '2'}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </Checkbox>
        ))}
      </Card>
    </div>
  );
};

export default CheckboxPage;
