import { Card, InputOTP } from 'skyroc-ui';

const Password = () => {
  return (
    <Card
      split
      title="Password"
    >
      <InputOTP
        mask
        placeholder="○"
        type="password"
      />
    </Card>
  );
};

export default Password;
