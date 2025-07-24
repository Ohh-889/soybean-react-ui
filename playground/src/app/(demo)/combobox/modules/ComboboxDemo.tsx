'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button, Card, Command, Popover, cn } from 'soybean-react-ui';

const ComboboxDemo = () => {
  const [value, setValue] = useState('');

  const frameworks = [
    {
      label: (
        <div className="flex items-center gap-2">
          <span>Vue</span>
          <Check className={cn('ml-auto', value === 'vue' ? 'opacity-100' : 'opacity-0')} />
        </div>
      ),
      value: 'vue'
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>React</span>
          <Check className={cn('ml-auto', value === 'react' ? 'opacity-100' : 'opacity-0')} />
        </div>
      ),
      value: 'react'
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>Next.js</span>
          <Check className={cn('ml-auto', value === 'nextjs' ? 'opacity-100' : 'opacity-0')} />
        </div>
      ),
      value: 'nextjs'
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>SvelteKit</span>
          <Check className={cn('ml-auto', value === 'sveltekit' ? 'opacity-100' : 'opacity-0')} />
        </div>
      ),
      value: 'sveltekit'
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>Nuxt</span>
          <Check className={cn('ml-auto', value === 'nuxt' ? 'opacity-100' : 'opacity-0')} />
        </div>
      ),
      value: 'nuxt'
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>Remix</span>
          <Check className={cn('ml-auto', value === 'remix' ? 'opacity-100' : 'opacity-0')} />
        </div>
      ),
      value: 'remix'
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>Astro</span>
          <Check className={cn('ml-auto', value === 'astro' ? 'opacity-100' : 'opacity-0')} />
        </div>
      ),
      value: 'astro'
    }
  ];

  return (
    <Card
      split
      classNames={{ content: 'w-60' }}
      title="Combobox Size"
    >
      <Popover
        classNames={{ content: 'p-0' }}
        trigger={
          <Button
            className="w-full justify-between md:max-w-[200px]"
            role="combobox"
            variant="pure"
          >
            {value ? frameworks.find(item => item.value === value)?.label : 'Select framework...'}
            <ChevronsUpDown className="text-muted-foreground" />
          </Button>
        }
      >
        <Command
          items={frameworks}
          inputProps={{
            onValueChange(search) {
              setValue(search);
            }
          }}
        />
      </Popover>
    </Card>
  );
};

export default ComboboxDemo;
