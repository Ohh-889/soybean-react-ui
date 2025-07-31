import { Card, KeyboardKey } from 'soybean-react-ui';

const KeyboardKeyDemo = () => {
  return (
    <Card
      split
      title="Combination"
    >
      <div className="flex flex-wrap gap-2">
        <KeyboardKey
          value={['command', 'k']}
          variant="solid"
        />
        <KeyboardKey
          value={['shift', 's']}
          variant="outline"
        />
        <KeyboardKey
          value={['ctrl', 'alt', 'a']}
          variant="ghost"
        />
      </div>
    </Card>
  );
};

export default KeyboardKeyDemo;
