'use client';

import { useState } from 'react';
import { Button, Card, DropdownMenuCheckbox } from 'soybean-react-ui';

import { menus2 } from './shared';

const Checkbox = () => {
  const [checks, setChecks] = useState<string[]>([]);

  return (
    <Card
      split
      title="Checkbox"
    >
      <DropdownMenuCheckbox
        checks={checks}
        items={menus2}
        onChecksChange={setChecks}
      >
        <Button variant="pure">Checkbox Dropdown</Button>
      </DropdownMenuCheckbox>
    </Card>
  );
};

export default Checkbox;
