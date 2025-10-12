import React from 'react';
import { AspectRatio, Card } from 'skyroc-ui';

const AspectRatioDemo = () => {
  return (
    <Card
      split
      title="Aspect Ratio"
    >
      <div className="w-[600px] max-sm:w-full">
        <AspectRatio
          className="bg-muted"
          ratio={16 / 9}
        >
          <img
            alt="Photo by Drew Beamer"
            className="h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          />
        </AspectRatio>
      </div>
    </Card>
  );
};

export default AspectRatioDemo;
