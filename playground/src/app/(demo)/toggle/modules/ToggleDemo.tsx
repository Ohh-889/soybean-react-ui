import type { ToggleProps } from 'soybean-react-ui';
import { Card, Toggle } from 'soybean-react-ui';

const variants: ToggleProps['variant'][] = ['ghost', 'outline'];

const ToggleDemo = () => {
  return (
    <Card
      split
      title="Variant"
    >
      <div className="flex gap-12px">
        {variants.map(variant => (
          <Toggle
            key={variant}
            variant={variant}
          >
            {variant}
          </Toggle>
        ))}
      </div>
    </Card>
  );
};

export default ToggleDemo;
