import { Card, Label, ToggleGroup } from 'soybean-react-ui';

import { items } from './shared';

const ToggleGroupMulti = () => {
  return (
    <Card
      split
      title="Multi"
    >
      <ToggleGroup
        items={items}
        type="multiple"
        itemRender={item => {
          return <Label>{item.label}</Label>;
        }}
      />
    </Card>
  );
};

export default ToggleGroupMulti;
