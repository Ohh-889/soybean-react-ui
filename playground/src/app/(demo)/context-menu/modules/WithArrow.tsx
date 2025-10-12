'use client';

import { Card, ContextMenu } from 'skyroc-ui';

import { menus } from '../../dropdown-menu/modules/shared';

const WithArrow = () => {
  return (
    <Card
      split
      title="With Arrow"
    >
      <ContextMenu
        contentProps={{ showArrow: true }}
        items={menus}
      >
        <div className="h-50 max-sm:w-auto w-80 flex items-center justify-center border rounded-md border-dashed text-sm">
          Right click here
        </div>
      </ContextMenu>
    </Card>
  );
};

export default WithArrow;
