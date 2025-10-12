'use client';

import { Button, Card, DropdownMenu } from 'skyroc-ui';

import { menus } from './shared';

const WithArrow = () => {
  return (
    <Card
      split
      title="With Arrow"
    >
      <DropdownMenu
        contentProps={{ showArrow: true }}
        items={menus}
      >
        <Button variant="pure">Open Dropdown</Button>
      </DropdownMenu>
    </Card>
  );
};

export default WithArrow;
