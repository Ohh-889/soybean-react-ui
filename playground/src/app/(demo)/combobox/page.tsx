'use client';

import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button, Card, Combobox } from 'soybean-react-ui';

const frameworks = [
  { label: 'Vue', value: '0' },
  { label: 'React', value: '1' },
  { label: 'Next.js', value: '2' },
  { label: 'SvelteKit', value: '3' },
  { label: 'Nuxt', value: '4' },
  { label: 'Remix', value: '5' },
  { label: 'Astro', value: '6' }
];

const ComboboxDemo = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Card
      split
      title="Combobox Size"
    >
      <Combobox
        items={frameworks}
        trigger={
          <Button
            aria-expanded={open}
            className="w-full justify-between md:max-w-[200px]"
            role="combobox"
            variant="pure"
          >
            {value ? frameworks.find(framework => framework.value === value)?.label : 'Select framework...'}
            <ChevronsUpDown className="text-muted-foreground" />
          </Button>
        }
      />
    </Card>
  );
};

export default ComboboxDemo;
