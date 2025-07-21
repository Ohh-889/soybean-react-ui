import { ChevronsUpDown } from 'lucide-react';
import { ButtonIcon, Card, Collapsible, CollapsibleTrigger } from 'soybean-react-ui';

const DefaultCollapsibleDemo = () => {
  return (
    <Card
      split
      title="Collapsible"
    >
      <Collapsible
        className="w-[350px] max-sm:w-auto space-y-2"
        classNames={{ content: 'space-y-2' }}
        content={
          <>
            <div className="border rounded-md px-4 py-3 text-sm font-mono">@soybean-ui/colors</div>
            <div className="border rounded-md px-4 py-3 text-sm font-mono">soybean-ui</div>
          </>
        }
      >
        <div className="flex-y-center justify-between px-2 space-x-4">
          <h4 className="text-sm font-semibold">@soybeanjs starred 3 repositories</h4>

          <CollapsibleTrigger asChild>
            <ButtonIcon>
              <ChevronsUpDown />
            </ButtonIcon>
          </CollapsibleTrigger>
        </div>

        <div className="border rounded-md px-4 py-3 text-sm font-mono">@soybean-ui/primitives</div>
      </Collapsible>
    </Card>
  );
};

export default DefaultCollapsibleDemo;
