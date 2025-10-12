'use client';

import { useState } from 'react';
import { Card, ContextMenuCheckbox } from 'skyroc-ui';

import { menus2 } from '../../dropdown-menu/modules/shared';

const Checkbox = () => {
  const [checks, setChecks] = useState<string[]>([]);

  return (
    <Card
      split
      title="Checkbox"
    >
      <ContextMenuCheckbox
        checks={checks}
        items={menus2}
        onChecksChange={setChecks}
      >
        <div className="h-50 w-80 flex max-sm:w-auto items-center justify-center border rounded-md border-dashed text-sm">
          Right click here
        </div>
      </ContextMenuCheckbox>
    </Card>
  );
};

export default Checkbox;
