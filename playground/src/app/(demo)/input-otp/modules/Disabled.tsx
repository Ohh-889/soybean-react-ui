import { Card, InputOTP } from 'skyroc-ui';

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
