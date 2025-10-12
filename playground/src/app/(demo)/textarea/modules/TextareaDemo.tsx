import { Card, Textarea } from 'skyroc-ui';

const TextareaDemo = () => {
  return (
    <Card
      split
      title="word count"
    >
      <Textarea showCount />
    </Card>
  );
};

export default TextareaDemo;
