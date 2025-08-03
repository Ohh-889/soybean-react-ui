import { Card, InputOTP } from 'soybean-react-ui';

const Disabled = () => {
  return (
    <Card
      split
      title="Disabled"
    >
      <InputOTP
        disabled
        placeholder="○"
      />
    </Card>
  );
};

export default Disabled;
