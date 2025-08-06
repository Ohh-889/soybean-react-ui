import type { SheetSide } from 'soybean-react-ui';
import { Button, Card, Sheet } from 'soybean-react-ui';

const sides: SheetSide[] = ['left', 'right', 'top', 'bottom'];

const Side = () => {
  return (
    <Card
      split
      title="Side"
    >
      <div className="flex flex-wrap gap-3">
        {sides.map(side => (
          <Sheet
            footer={<Button>Confirm</Button>}
            key={side}
            title="Sheet Title"
            trigger={<Button variant="outline">{side}</Button>}
            contentProps={{
              side
            }}
          >
            Sheet Content
          </Sheet>
        ))}
      </div>
    </Card>
  );
};

export default Side;
