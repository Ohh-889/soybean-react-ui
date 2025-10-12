import type { ThemeSize } from 'skyroc-ui';
import { Card, KeyboardKey } from 'skyroc-ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const KeyboardKeySize = () => {
  return (
    <Card
      split
      title="Size"
    >
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <div
            className="flex-c justify-between"
            key={size}
          >
            <div>{size}</div>

            <KeyboardKey
              size={size}
              value="command"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default KeyboardKeySize;
