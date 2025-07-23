'use client';

import { useState } from 'react';
import { Card, ContextMenuRadio } from 'soybean-react-ui';

import { menus3 } from '../../dropdown-menu/modules/shared';

const Radio = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Card
      split
      title="Radio"
    >
      <ContextMenuRadio
        items={menus3}
        value={value}
        onValueChange={setValue}
      >
        <div className="h-50 w-80 flex items-center justify-center border rounded-md border-dashed text-sm">
          Right click here
        </div>
      </ContextMenuRadio>
    </Card>
  );
};

export default Radio;
