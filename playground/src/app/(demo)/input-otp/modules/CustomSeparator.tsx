import { Card, InputOTP } from 'skyroc-ui';

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
