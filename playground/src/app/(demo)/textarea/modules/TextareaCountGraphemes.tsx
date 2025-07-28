'use client';

import GraphemeSplitter from 'grapheme-splitter';
import { useState } from 'react';
import { Card, Textarea } from 'soybean-react-ui';
import type { TextareaProps } from 'soybean-react-ui';

const splitter = new GraphemeSplitter();

const countGraphemes = (text: TextareaProps['value']) => {
  if (!text) {
    return 0;
  }
  return splitter.countGraphemes(String(text));
};

const TextareaCountGraphemes = () => {
  const [value, setValue] = useState<TextareaProps['value']>('🌷🇨🇳');

  return (
    <Card
      split
      title="Count graphemes"
    >
      <Textarea
        showCount
        countGraphemes={countGraphemes}
        value={value}
        onTextChange={setValue}
      />
    </Card>
  );
};

export default TextareaCountGraphemes;
