import { Card, InputOTP } from 'soybean-react-ui';

const CustomSeparator = () => {
  return (
    <Card
      split
      title="Custom Separator"
    >
      <InputOTP separator="-" />
    </Card>
  );
};

export default CustomSeparator;
