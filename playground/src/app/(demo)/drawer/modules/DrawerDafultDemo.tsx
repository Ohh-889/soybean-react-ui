import { Button, Card, Drawer, DrawerClose } from 'skyroc-ui';

const DrawerDafultDemo = () => {
  return (
    <Card
      split
      title="Drawer"
    >
      <Drawer
        showClose
        title="Drawer Title"
        trigger={<Button variant="outline">Open</Button>}
        classNames={{
          contentBody: 'mx-auto max-w-sm w-full'
        }}
        footer={
          <>
            <DrawerClose asChild>
              <Button variant="plain">Cancel</Button>
            </DrawerClose>
            <Button>Submit</Button>
          </>
        }
      >
        <p>
          This is a basic drawer with a title and description.
          <br />
          For some strange reason the Vaul won&apos;t pull to close when a form is present inside it
        </p>
      </Drawer>
    </Card>
  );
};

export default DrawerDafultDemo;
