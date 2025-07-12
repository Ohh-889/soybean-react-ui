'use client';

import { ChevronsLeftRightEllipsis } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb, Card } from 'soybean-react-ui';

import { items, items2, items3, items4, sizes } from './modules/shared';

const BreadcrumbPage = () => {
  return (
    <div className="flex-c gap-4">
      <Card
        split
        title="Default"
      >
        <Breadcrumb items={items} />
      </Card>

      <Card
        split
        title="Custom Item"
      >
        <Breadcrumb
          items={items4}
          renderItem={item => <Link href={item.value}>{item.label}</Link>}
        />
      </Card>

      <Card
        split
        title="Custom Separator"
      >
        <Breadcrumb
          items={items}
          separator={<span className="text-sm text-gray-500">/</span>}
        />
      </Card>

      <Card
        split
        title="Link"
      >
        <Breadcrumb items={items2} />
      </Card>

      <Card
        split
        title="Ellipsis"
      >
        <Breadcrumb
          ellipsis
          items={items3}
        />
      </Card>

      <Card
        split
        title="Custom Ellipsis"
      >
        <Breadcrumb
          ellipsis
          ellipsisIcon={<ChevronsLeftRightEllipsis />}
          items={items3}
        />
      </Card>

      <Card
        split
        title="Size"
      >
        <div className="flex-c-stretch gap-[12px]">
          {sizes.map(size => (
            <Breadcrumb
              items={items}
              key={size}
              size={size}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BreadcrumbPage;
