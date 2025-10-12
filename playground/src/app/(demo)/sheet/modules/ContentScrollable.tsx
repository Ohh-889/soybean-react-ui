import { Button, Card, Sheet } from 'skyroc-ui';

const ContentScrollable = () => {
  return (
    <Card title="Content Scrollable">
      <Sheet
        footer={<Button>Confirm</Button>}
        title="Sheet Title"
        trigger={<Button variant="outline">Scrollable</Button>}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i}>Sheet Content</div>
        ))}
      </Sheet>
    </Card>
  );
};

export default ContentScrollable;
