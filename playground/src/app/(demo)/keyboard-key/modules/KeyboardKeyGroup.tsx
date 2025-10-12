import { Card, KeyboardKeyGroup } from 'skyroc-ui';

const KeyboardKeyGroupDemo = () => {
  return (
    <Card
      split
      title="Group"
    >
      <div className="flex-c gap-2">
        <KeyboardKeyGroup
          values={['command', 'shift', 'alt']}
          variant="solid"
        />

        <KeyboardKeyGroup
          separator="-"
          values={['command', 'shift', 'alt']}
          variant="outline"
        />

        <KeyboardKeyGroup
          separator=" "
          values={['command', 'shift', 'alt']}
          variant="ghost"
        />
      </div>
    </Card>
  );
};

export default KeyboardKeyGroupDemo;
