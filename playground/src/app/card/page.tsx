import { Rocket, X } from 'lucide-react';
import React from 'react';
import {
  Card
  //   ButtonIcon,
  //   Badge,
} from 'soybean-react-ui'; // 假设这些是你自己封装的 React 组件
import type { ThemeSize } from 'soybean-react-ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const DemoCard: React.FC = () => {
  return (
    <div className="gap-4 items-center justify-center">
      <Card
        split
        title="Size"
      >
        <div className="w-1/2 i-flex-c pr-10px lt-sm:w-full lt-sm:pr-0">
          {sizes.map(size => (
            <Card
              className="mb-12px"
              extra="extra"
              footer="Footer"
              key={`left-${size}`}
              size={size}
              title={`Size: ${size}`}
            >
              <p className="text-gray-500 dark:text-neutral-400">Content</p>
            </Card>
          ))}
        </div>

        <div className="w-1/2 i-flex-c lt-sm:w-full pl-10px lt-sm:pl-0">
          {sizes.map(size => (
            <Card
              split
              className="mb-12px"
              extra={<X />}
              footer="Footer"
              key={`right-${size}`}
              size={size}
              title={`Size: ${size}`}
            >
              <p className="text-gray-500 dark:text-neutral-400">Content</p>
            </Card>
          ))}
        </div>
      </Card>

      <Card
        split
        classNames={{ content: 'flex-c-stretch gap-4' }}
        title="More"
      >
        <Card>
          <p className="text-gray-500 dark:text-neutral-400">Only Content</p>
        </Card>

        <Card
          split
          title="Title"
        >
          <p className="text-gray-500 dark:text-neutral-400">Content</p>
        </Card>

        <Card
          split
          footer="Footer"
        >
          <p className="text-gray-500 dark:text-neutral-400">Content</p>
        </Card>

        <Card
          split
          title="Title Slot"
          titleLeading={<Rocket />}
        >
          <p className="text-gray-500 dark:text-neutral-400">Content</p>
        </Card>
      </Card>
    </div>
  );
};

export default DemoCard;
