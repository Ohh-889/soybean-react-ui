import { Card, Textarea } from 'soybean-react-ui';

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
