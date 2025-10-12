'use client';

import { useState } from 'react';
import { Card, Input } from 'skyroc-ui';

const InputDefaultDemo = () => {
  const [modelValue, setModelValue] = useState('');
  return (
    <Card
      split
      title={`ModelValue : ${modelValue}`}
    >
      <div className="w-320px lt-sm:w-auto">
        <Input
          placeholder="Please input"
          value={modelValue}
          onChange={e => setModelValue(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default InputDefaultDemo;
