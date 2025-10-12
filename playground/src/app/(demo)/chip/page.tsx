import type { ChipPosition, ThemeColor, ThemeSize } from 'skyroc-ui';
import { Button, Card, Chip } from 'skyroc-ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

const positions: ChipPosition[] = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const ChipPage = () => {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Color"
      >
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <div key={color}>
              <Chip color={color}>
                <Button variant="dashed">{color}</Button>
              </Chip>
            </div>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Color With Text"
      >
        <div className="flex flex-wrap gap-4">
          {colors.map(color => (
            <div key={color}>
              <Chip
                color={color}
                content="99+"
              >
                <Button variant="dashed">{color}</Button>
              </Chip>
            </div>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Positions"
      >
        <div className="flex flex-wrap gap-3">
          {positions.map(position => (
            <div key={position}>
              <Chip position={position}>
                <Button
                  className="w-30"
                  variant="dashed"
                >
                  {position}
                </Button>
              </Chip>
            </div>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Size"
      >
        <div className="flex flex-wrap gap-3">
          {sizes.map(size => (
            <div key={size}>
              <Chip size={size}>
                <Button
                  size={size}
                  variant="soft"
                >
                  {size}
                </Button>
              </Chip>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {sizes.map(size => (
            <div key={size}>
              <Chip
                content="99+"
                size={size}
              >
                <Button
                  size={size}
                  variant="soft"
                >
                  {size}
                </Button>
              </Chip>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ChipPage;
