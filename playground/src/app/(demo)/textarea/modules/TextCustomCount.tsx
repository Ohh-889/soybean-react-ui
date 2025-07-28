'use client';

import { Card, Textarea } from 'soybean-react-ui';

const TextCustomCount = () => {
  return (
    <Card
      split
      title="Count graphemes"
    >
      <Textarea
        showCount
        countRender={count => <span className="text-[red]">count is {count}</span>}
      />
    </Card>
  );
};

export default TextCustomCount;
