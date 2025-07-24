import { Card, Command } from 'soybean-react-ui';

import { items } from './shared';

const DefaultDemo = () => {
  return (
    <Card
      split
      title="Command"
    >
      <Command
        className="border rounded-lg shadow-md"
        items={items}
      />
    </Card>
  );
};

export default DefaultDemo;
