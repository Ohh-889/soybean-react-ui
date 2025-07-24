import { Button, Card, Dialog, DialogClose } from 'soybean-react-ui';

const WithFooter = () => {
  return (
    <Card
      split
      title="With Footer"
    >
      <Dialog
        title="Dialog Title"
        trigger={<Button variant="outline">Open</Button>}
        footer={
          <>
            <DialogClose asChild>
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

export default WithFooter;
