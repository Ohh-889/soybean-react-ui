import { Button, Card, Dialog } from 'skyroc-ui';

const DefaultDemo = () => {
  return (
    <Card
      split
      title="Default"
    >
      <Dialog
        description="Dialog Description"
        title="Dialog Title"
        trigger={<Button variant="outline">Open</Button>}
      >
        <div>Dialog Content</div>
      </Dialog>
    </Card>
  );
};

export default DefaultDemo;
