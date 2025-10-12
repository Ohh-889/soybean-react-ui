import { Card, Carousel } from 'skyroc-ui';

import PluginDemo from './modules/PluginDemo';

const CarouselPage = () => {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Default"
      >
        <div className="p-10">
          <Carousel
            classNames={{ item: 'h-[100px] md:basis-1/4 lg:basis-1/5' }}
            counts={10}
            opts={{ loop: true }}
          >
            {index => (
              <Card className="size-full">
                <div className="size-full flex-center">{index}</div>
              </Card>
            )}
          </Carousel>
        </div>
      </Card>

      <PluginDemo />

      <Card
        split
        title="vertical"
      >
        <div className="p-10">
          <Carousel
            classNames={{ content: 'h-[200px]', item: 'md:basis-1/2' }}
            counts={10}
            opts={{ loop: true }}
            orientation="vertical"
          >
            {index => (
              <Card className="size-full">
                <div className="size-full flex-center">{index}</div>
              </Card>
            )}
          </Carousel>
        </div>
      </Card>
    </div>
  );
};

export default CarouselPage;
