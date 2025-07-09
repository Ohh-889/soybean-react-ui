import React from 'react';
import { Card, Divider, ScrollArea } from 'soybean-react-ui';

interface Artwork {
  art: string;
  artist: string;
  id: string;
}

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const works: Artwork[] = [
  {
    art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
    artist: 'Ornella Binni',
    id: '1'
  },
  {
    art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
    artist: 'Tom Byrom',
    id: '2'
  },
  {
    art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
    artist: 'Vladimir Malyavko',
    id: '3'
  }
];

function ScrollAreaDemo() {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Vertical"
      >
        <ScrollArea
          className="h-72 w-48 border rounded-md"
          orientation="vertical"
        >
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>

            {tags.map(tag => (
              <div key={tag}>
                <div className="text-sm">{tag}</div>

                <Divider className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card
        split
        title="Horizontal"
      >
        <ScrollArea
          className="w-96 whitespace-nowrap border rounded-md"
          orientation="horizontal"
        >
          <div className="w-max flex p-4 space-x-4">
            {works.map(work => (
              <div key={work.id}>
                <figure className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <img
                      alt={`Photo by ${work.artist}`}
                      className="aspect-[3/4] h-56 w-36 object-cover"
                      src={work.art}
                    />
                  </div>
                  <figcaption className="pt-2 text-xs text-muted-foreground">
                    Photo by
                    <span className="text-foreground font-semibold">{work.artist}</span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}

export default ScrollAreaDemo;
