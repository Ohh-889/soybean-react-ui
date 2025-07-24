import { Card, Input } from 'soybean-react-ui';

const InputDisabled = () => {
  return (
    <Card
      split
      title="Disabled"
    >
      <div className="w-320px lt-sm:w-auto">
        <Input
          disabled
          placeholder="Please input"
          value="the input is disabled"
        />
      </div>
    </Card>
  );
};

export default InputDisabled;
