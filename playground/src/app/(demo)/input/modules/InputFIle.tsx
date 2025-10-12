import { Card, Input } from 'skyroc-ui';

const InputFile = () => {
  return (
    <Card
      split
      title="File"
    >
      <div className="w-320px lt-sm:w-auto">
        <Input type="file" />
      </div>
    </Card>
  );
};

export default InputFile;
