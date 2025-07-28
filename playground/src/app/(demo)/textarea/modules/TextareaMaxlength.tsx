import { Card, Textarea } from 'soybean-react-ui';

const TextareaMaxlength = () => {
  return (
    <Card
      split
      title="word count with maxlength"
    >
      <Textarea
        showCount
        maxLength={6}
      />
    </Card>
  );
};

export default TextareaMaxlength;
