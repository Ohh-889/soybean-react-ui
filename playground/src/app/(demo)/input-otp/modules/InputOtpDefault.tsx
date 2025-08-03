'use client';

import { Card, InputOTP, toast } from 'soybean-react-ui';

const InputOtpDefault = () => {
  const handleComplete = (value: string[]) => {
    toast.info(`the input value is ${value}`, {
      position: 'top-center'
    });
  };

  return (
    <Card
      split
      title="Default"
    >
      <InputOTP
        inputMode="numeric"
        placeholder="○"
        onComplete={handleComplete}
      />
    </Card>
  );
};

export default InputOtpDefault;
