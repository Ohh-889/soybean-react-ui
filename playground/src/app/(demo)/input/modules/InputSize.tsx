import type { ThemeSize } from 'soybean-react-ui';
import { Card, Input } from 'soybean-react-ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const InputSize = () => {
  return (
    <Card
      split
      title="Size"
    >
      <div className="w-320px flex-c-stretch gap-3 lt-sm:w-auto">
        {sizes.map(size => (
          <div key={size}>
            <div>{size}</div>

            <Input
              placeholder={`${size} Please input`}
              size={size}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InputSize;
