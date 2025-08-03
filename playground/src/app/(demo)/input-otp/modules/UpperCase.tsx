'use client';

import { useState } from 'react';
import { Card, InputOTP } from 'soybean-react-ui';

const UpperCase = () => {
  const [value, setValue] = useState('');

  function handleChange(newValue: string) {
    setValue(newValue.toUpperCase());
  }

  return (
    <Card
      split
      title="UpperCase"
    >
      <InputOTP
        placeholder="○"
        value={value}
        onChange={handleChange}
      />
    </Card>
  );
};

export default UpperCase;
