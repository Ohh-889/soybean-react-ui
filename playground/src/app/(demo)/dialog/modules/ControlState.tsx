'use client';

import { useState } from 'react';
import { Button, Card, Dialog } from 'skyroc-ui';

const ControlState = () => {
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }

  function openDialog() {
    setOpen(true);
  }

  return (
    <Card
      split
      title="Control Open State"
    >
      <Dialog
        open={open}
        title="Dialog Title"
        footer={
          <>
            <Button
              variant="plain"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button onClick={closeDialog}>Confirm</Button>
          </>
        }
        trigger={
          <Button
            variant="outline"
            onClick={openDialog}
          >
            Open
          </Button>
        }
        onOpenChange={setOpen}
      >
        <div>Dialog Content</div>
      </Dialog>
    </Card>
  );
};

export default ControlState;
