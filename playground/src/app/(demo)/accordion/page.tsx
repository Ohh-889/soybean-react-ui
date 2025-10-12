import { Accordion, Card } from 'skyroc-ui';

import CustomIcon from './modules/CustomIcon';
import { items, sizes } from './modules/shared';

function AccordionDemo() {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Single Collapse"
      >
        <Accordion
          collapsible
          items={items}
          type="single"
        />
      </Card>

      <Card
        split
        title="Single Collapse (always open one)"
      >
        <Accordion
          items={items}
          type="single"
        />
      </Card>

      <Card
        split
        title="Multi Collapse"
      >
        <Accordion
          items={items}
          type="multiple"
        />
      </Card>

      <Card
        split
        title="Custom Styling"
      >
        <Accordion
          collapsible
          items={items}
          type="single"
          classNames={{
            content: 'px-3 leading-8',
            item: 'border-b-0',
            trigger: `mb-2 rounded-md px-3 text-left underline-offset-2 data-[state=closed]:(bg-muted/50 no-underline) data-[state=open]:(bg-secondary-foreground/20 underline hover:bg-secondary-foreground/20 hover:underline) hover:bg-muted`
          }}
        />
      </Card>

      <CustomIcon />

      <Card
        split
        title="Size"
      >
        <div className="gap-4 flex flex-wrap justify-between">
          {sizes.map(size => (
            <Card
              split
              className="basis-[48%] max-sm:basis-[100%]"
              key={size}
              title={size}
            >
              <Accordion
                collapsible
                items={items}
                size={size}
                type="single"
              />
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default AccordionDemo;
