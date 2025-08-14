'use client';

import { Button, Card, Dialog, DialogClose } from 'soybean-react-ui';

const AutoClose = () => {
  return (
    <Card
      split
      title="Disabled close when click outside or press escape key"
    >
      <Dialog
        title="Dialog Title"
        trigger={<Button variant="outline">Open</Button>}
        contentProps={{
          onEscapeKeyDown: e => e.preventDefault(),
          onPointerDownOutside: e => e.preventDefault()
        }}
        footer={
          <>
            <DialogClose>
              <Button variant="plain">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </>
        }
      >
        <div>Dialog Content</div>
      </Dialog>
    </Card>
  );
};

export default AutoClose;
