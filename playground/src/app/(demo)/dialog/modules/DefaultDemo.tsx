import { Button, Card, Dialog } from 'soybean-react-ui';

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
