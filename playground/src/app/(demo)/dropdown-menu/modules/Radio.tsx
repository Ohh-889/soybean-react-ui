'use client';

import { useState } from 'react';
import { Button, Card, DropdownMenuRadio } from 'skyroc-ui';

import { menus3 } from './shared';

const Radio = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Card
      split
      title="Radio"
    >
      <DropdownMenuRadio
        items={menus3}
        value={value}
        onValueChange={setValue}
      >
        <Button variant="pure">Radio Dropdown</Button>
      </DropdownMenuRadio>
    </Card>
  );
};

export default Radio;
