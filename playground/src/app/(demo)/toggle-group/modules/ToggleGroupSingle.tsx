import { Card, ToggleGroup } from 'skyroc-ui';

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
