import { Card, ToggleGroup } from 'soybean-react-ui';

import { items } from './shared';

const ToggleGroupSingle = () => {
  return (
    <Card
      split
      title="Single"
    >
      <ToggleGroup
        items={items}
        type="single"
      />
    </Card>
  );
};

export default ToggleGroupSingle;
