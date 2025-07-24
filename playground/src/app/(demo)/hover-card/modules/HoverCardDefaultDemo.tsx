import { Avatar, Button, Card, HoverCard } from 'soybean-react-ui';

const HoverCardDefaultDemo = () => {
  return (
    <Card
      split
      title="Default"
    >
      <HoverCard
        classNames={{ content: 'w-64' }}
        trigger={<Button variant="link">@soybeanjs</Button>}
      >
        <div className="flex justify-between space-x-4">
          <Avatar
            fallback="VC"
            src="/icon.svg"
          />

          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@soybeanjs</h4>
            <p className="text-sm">SoybeanJS is a front-end technology team, built by Soybean.</p>
          </div>
        </div>
      </HoverCard>
    </Card>
  );
};

export default HoverCardDefaultDemo;
