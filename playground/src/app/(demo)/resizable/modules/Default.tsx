import { CircleDashed } from 'lucide-react';
import { Card, ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'soybean-react-ui';

const Default = () => {
  return (
    <Card
      split
      title="Resizable"
    >
      <ResizablePanelGroup
        className="max-w-md border rounded-lg"
        direction="horizontal"
        id="demo-group-1"
      >
        <ResizablePanel
          collapsible
          collapsedSize={10}
          defaultSize={50}
          id="demo-panel-1"
          minSize={20}
        >
          <div className="h-[200px] flex items-center justify-center p-6">
            <span className="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          id="demo-handle-1"
        />
        <ResizablePanel
          defaultSize={50}
          id="demo-panel-2"
          minSize={20}
        >
          <ResizablePanelGroup
            direction="vertical"
            id="demo-group-2"
          >
            <ResizablePanel
              defaultSize={25}
              id="demo-panel-3"
              minSize={25}
            >
              <div className="h-full flex items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>

            <ResizableHandle
              withHandle
              id="demo-handle-2"
            >
              <CircleDashed />
            </ResizableHandle>

            <ResizablePanel
              defaultSize={75}
              id="demo-panel-4"
              minSize={25}
            >
              <div className="h-full flex items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Card>
  );
};

export default Default;
