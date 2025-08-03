import { Card, InputOTP } from 'soybean-react-ui';

const InputOtpCustomCount = () => {
  return (
    <Card
      split
      title="Custom Input Count"
    >
      <InputOTP
        inputCount={8}
        placeholder="○"
      />
    </Card>
  );
};

export default InputOtpCustomCount;
