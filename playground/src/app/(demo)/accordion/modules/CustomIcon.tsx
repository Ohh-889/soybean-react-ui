'use client';

import { AArrowDownIcon, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Accordion, Card } from 'soybean-react-ui';

import { items2 } from './shared';

const CustomIcon = () => {
  const [value, setValue] = useState('1');

  return (
    <Card
      split
      title="Custom Icon"
    >
      <Accordion
        items={items2}
        triggerIcon={<AArrowDownIcon />}
        triggerLeading={<Minus />}
        triggerTrailing={<Plus />}
        type="single"
        value={value}
        onValueChange={setValue}
      />
    </Card>
  );
};

export default CustomIcon;
