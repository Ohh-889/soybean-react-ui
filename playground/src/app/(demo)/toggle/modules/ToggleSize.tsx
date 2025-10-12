import type { ToggleProps } from 'skyroc-ui';
import { Card, Toggle } from 'skyroc-ui';

const sizes: ToggleProps['size'][] = ['sm', 'md', 'lg', 'xl', '2xl'];

const ToggleDemo = () => {
  return (
    <Card
      split
      title="Size"
    >
      <div className="flex flex-wrap gap-12px">
        {sizes.map(size => (
          <Toggle
            key={size}
            size={size}
            variant="ghost"
          >
            {size}
          </Toggle>
        ))}
      </div>
    </Card>
  );
};

export default ToggleDemo;
