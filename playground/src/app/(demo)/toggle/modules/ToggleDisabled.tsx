import { Card, Toggle } from 'soybean-react-ui';

const ToggleDisabled = () => {
  return (
    <Card
      split
      title="Disabled"
    >
      <div className="flex flex-wrap gap-12px">
        <Toggle
          disabled
          size="md"
          variant="ghost"
        >
          disabled
        </Toggle>
        <Toggle
          disabled
          size="md"
          variant="outline"
        >
          disabled
        </Toggle>
      </div>
    </Card>
  );
};

export default ToggleDisabled;
