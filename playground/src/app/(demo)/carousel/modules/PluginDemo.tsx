'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Card, Carousel } from 'skyroc-ui';

const PluginDemo = () => {
  return (
    <Card
      split
      title="Only one item & plugins"
    >
      <div className="p-10">
        <Carousel
          className="w-full max-w-xs"
          counts={5}
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <Card className="w-[310px] h-[310px]">
            <div className="size-full flex-col flex-center">
              <Image
                alt="1"
                height={260}
                src="https://picsum.photos/280/280"
                width={260}
              />

              <span className="text-sm mt-1 font-semibold">1</span>
            </div>
          </Card>

          <Card
            className="w-[310px] h-[310px]"
            title="2"
          >
            <div className="size-full flex-center flex-col">
              <Image
                alt="1"
                height={260}
                src="https://picsum.photos/280/280"
                width={260}
              />

              <span className="text-sm mt-1 font-semibold">2</span>
            </div>
          </Card>

          <Card
            className="w-[310px] h-[310px]"
            title="3"
          >
            <div className="size-full flex-center flex-col">
              <Image
                alt="1"
                height={260}
                src="https://picsum.photos/280/280"
                width={260}
              />

              <span className="text-sm mt-1 font-semibold">3</span>
            </div>
          </Card>

          <Card
            className="w-[310px] h-[310px]"
            title="4"
          >
            <div className="size-full flex-center flex-col">
              <Image
                alt="1"
                height={260}
                src="https://picsum.photos/280/280"
                width={260}
              />

              <span className="text-sm mt-1 font-semibold">4</span>
            </div>
          </Card>

          <Card
            className="w-[310px] h-[310px]"
            title="5"
          >
            <span className="font-semibold size-full flex-center text-4xl">5</span>
          </Card>
        </Carousel>
      </div>
    </Card>
  );
};

export default PluginDemo;
