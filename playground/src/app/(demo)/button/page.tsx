import { Loader, Minus, Pause, Plus, SkipBack, SkipForward } from 'lucide-react';
import React from 'react';
import { Button, ButtonGroup, ButtonIcon, Card } from 'soybean-react-ui';

const colors = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'] as const;
const variants = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const shadows = ['none', 'sm', 'md', 'lg'] as const;

const DemoButton = () => {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Color"
      >
        <div className="flex flex-wrap gap-[12px]">
          {colors.map(color => (
            <Button
              color={color}
              key={color}
            >
              {color}
            </Button>
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
                <Button
                  color={color}
                  key={variant}
                  variant={variant}
                >
                  {variant}
                </Button>
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
          {sizes.map((size, index) => (
            <Button
              color={colors[index]}
              key={size}
              size={size}
              variant="outline"
            >
              {size}
            </Button>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Shape"
      >
        <div className="flex flex-wrap gap-[12px]">
          <Button
            color="primary"
            shape="rounded"
            variant="solid"
          >
            rounded
          </Button>
          <div className="flex-c-center">
            <Button
              fitContent
              color="destructive"
              shape="square"
              variant="plain"
            >
              <Minus />
            </Button>
            <div className="text-[12px] text-[#666]">square</div>
          </div>
          <div className="flex-c-center">
            <Button
              fitContent
              color="success"
              shape="circle"
              variant="outline"
            >
              <Plus />
            </Button>
            <div className="text-[12px] text-[#666]">circle</div>
          </div>
          <div className="flex-c-center">
            <Button
              fitContent
              color="warning"
              shape="square"
              variant="dashed"
            >
              <Plus />
            </Button>
            <div className="text-[12px] text-[#666]">square</div>
          </div>
          <div className="flex-c-center">
            <ButtonIcon shape="circle">
              <Minus />
            </ButtonIcon>
            <div className="text-[12px] text-[#666]">circle</div>
          </div>
        </div>
      </Card>

      <Card
        split
        title="Shadow"
      >
        <div className="flex flex-wrap gap-[12px]">
          {shadows.map((shadow, index) => (
            <Button
              color={colors[index]}
              key={shadow}
              shadow={shadow}
              variant="plain"
            >
              {shadow}
            </Button>
          ))}
        </div>
      </Card>

      <Card
        split
        title="Slot"
      >
        <div className="flex flex-wrap gap-[12px]">
          <Button
            color="primary"
            leading={<Plus />}
          >
            leading
          </Button>

          <Button
            color="destructive"
            trailing={<Minus />}
            variant="outline"
          >
            After
          </Button>

          <Button
            color="success"
            leading={<Plus />}
            trailing={<Minus />}
            variant="dashed"
          >
            Both
          </Button>
        </div>
      </Card>

      <Card
        split
        title="Disabled"
      >
        <div className="flex flex-wrap gap-[12px]">
          <Button
            disabled
            color="destructive"
            variant="solid"
          >
            disabled
          </Button>
          <Button
            disabled
            color="success"
            variant="outline"
          >
            disabled
          </Button>
          <Button
            disabled
            color="warning"
            variant="dashed"
          >
            disabled
          </Button>
        </div>
      </Card>

      <Card
        split
        title="Loading"
      >
        <div className="flex flex-wrap gap-[12px]">
          <Button
            loading
            color="success"
            variant="solid"
          >
            Loading...
          </Button>
          <Button
            loading
            color="warning"
            leading={<Loader className="animate-spin" />}
            variant="outline"
          >
            Loading...
          </Button>
        </div>
      </Card>

      {/* <Card
        split
        title="Link"
      >
        <div className="flex flex-wrap gap-12px">
          <SButtonLink href="https://soybeanjs.cn">soybeanjs.cn</SButtonLink>
        </div>
      </Card> */}

      <Card
        split
        title="Button Group"
      >
        <div className="flex flex-wrap gap-[12px]">
          <ButtonGroup>
            <Button variant="outline">
              <SkipBack />
            </Button>
            <Button variant="outline">
              <Pause />
            </Button>
            <Button variant="outline">
              <SkipForward />
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button
              color="destructive"
              variant="outline"
            >
              <SkipBack />
            </Button>
            <Button
              color="destructive"
              variant="outline"
            >
              <SkipForward />
            </Button>
          </ButtonGroup>
        </div>
      </Card>

      <Card
        split
        title="Button Group vertical"
      >
        <div className="w-[100px]">
          <ButtonGroup orientation="vertical">
            <ButtonIcon variant="dashed">
              <SkipBack />
            </ButtonIcon>
            <ButtonIcon variant="dashed">
              <Pause />
            </ButtonIcon>
            <ButtonIcon variant="dashed">
              <SkipForward />
            </ButtonIcon>
          </ButtonGroup>
        </div>
      </Card>

      <Card
        split
        title="Button Icon"
      >
        <div className="flex flex-wrap gap-[12px]">
          <ButtonIcon>
            <SkipBack />
          </ButtonIcon>
          <ButtonIcon>
            <SkipForward />
          </ButtonIcon>
          <ButtonIcon>
            <Pause />
          </ButtonIcon>
        </div>
      </Card>

      <Card
        split
        title="Button Icon: fitContent"
      >
        <div className="flex flex-wrap gap-12px">
          <ButtonIcon className="p-0.5 text-xl">
            <SkipBack />
          </ButtonIcon>
          <ButtonIcon
            fitContent
            className="p-0.5 text-xl"
          >
            <SkipForward />
          </ButtonIcon>
          <ButtonIcon
            fitContent
            className="p-0.5 text-xl"
          >
            <Pause />
          </ButtonIcon>
        </div>
      </Card>
    </div>
  );
};

export default DemoButton;
