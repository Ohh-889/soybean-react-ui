import { Rocket, Terminal, TriangleAlert, X } from 'lucide-react';
import React from 'react';
import { Alert, type AlertVariant, ButtonIcon, Card, type ThemeColor, type ThemeSize } from 'skyroc-ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: AlertVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const AlertPage = () => {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Color"
      >
        <div className="flex flex-c-stretch gap-[12px]">
          {colors.map(color => (
            <Alert
              color={color}
              icon={<Terminal />}
              key={color}
              title={color}
            />
          ))}
        </div>
      </Card>

      <Card
        split
        title="Variant"
      >
        <div className="flex flex-c-stretch gap-[12px]">
          {variants.map((variant, index) => (
            <Alert
              color={colors[index]}
              icon={<Terminal />}
              key={variant}
              title={variant}
              variant={variant}
            />
          ))}
        </div>
      </Card>

      <Card
        split
        title="With description"
      >
        <Alert
          description="You can add components to your app using the cli."
          title="Heads up!"
          variant="pure"
        />
      </Card>

      <Card
        split
        title="With Icon"
      >
        <Alert
          color="success"
          icon={<Rocket />}
          title="Flighting !!!"
          variant="outline"
        />
      </Card>

      <Card
        split
        title="With description and icon"
      >
        <Alert
          color="destructive"
          description="Your session has expired. Please log in again."
          icon={<TriangleAlert />}
          title="Error"
          variant="ghost"
          trailing={
            <ButtonIcon
              fitContent={false}
              variant="ghost"
            >
              <X />
            </ButtonIcon>
          }
        />
      </Card>

      <Card
        split
        title="Size"
      >
        <div className="flex flex-c-stretch gap-[12px]">
          {sizes.map((size, index) => (
            <Alert
              color={colors[index]}
              key={size}
              size={size}
              title={`Size: ${size}`}
              variant="soft"
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AlertPage;
