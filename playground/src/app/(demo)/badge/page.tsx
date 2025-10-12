import { Badge, type BadgeShape, type BadgeVariant, Card, type ThemeColor, type ThemeSize } from 'skyroc-ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: BadgeVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost', 'raw'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const shapes: BadgeShape[] = ['auto', 'rounded'];

const BadgeDemo = () => {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Color"
      >
        <div className="flex flex-wrap gap-[12px]">
          {colors.map(color => (
            <Badge
              color={color}
              key={color}
            >
              {color}
            </Badge>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Variant"
      >
        <div className="flex-c-stretch gap-[12px]">
          {colors.map(color => (
            <div
              className="flex flex-wrap gap-[12px]"
              key={color}
            >
              {variants.map(variant => (
                <Badge
                  color={color}
                  key={variant}
                  variant={variant}
                >
                  {variant}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Size"
      >
        <div className="flex flex-wrap gap-[12px]">
          {sizes.map(size => (
            <Badge
              key={size}
              size={size}
              variant="soft"
            >
              {size}
            </Badge>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Shape"
      >
        <div className="flex flex-wrap gap-[12px]">
          {shapes.map(shape => (
            <Badge
              key={shape}
              shape={shape}
              variant="ghost"
            >
              {shape}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BadgeDemo;
