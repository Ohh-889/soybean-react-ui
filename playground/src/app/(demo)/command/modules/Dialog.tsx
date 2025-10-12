'use client';

import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Card, Command, CommandDialog, KeyboardKey } from 'skyroc-ui';

import { items } from './shared';

const CommandDialogDemo = () => {
  const [open, setOpen] = useState(false);

  useHotkeys(
    'meta+j',
    () => {
      setOpen(true);
    },
    { enableOnFormTags: true, preventDefault: true }
  );

  return (
    <Card
      split
      title="Dialog Command"
    >
      <KeyboardKey value={['command', 'j']} />
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <Command
          empty="No option found"
          inputProps={{ placeholder: 'Type a command or search...' }}
          items={items}
        />
      </CommandDialog>
    </Card>
  );
};

export default CommandDialogDemo;
