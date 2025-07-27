import { TooltipProvider } from 'soybean-react-ui';

import TooltipArrow from './modules/TooltipArrow';
import TooltipDemo from './modules/TooltipDemo';

export default function TooltipPage() {
  return (
    <div className="flex-c gap-4">
      <TooltipProvider>
        <TooltipDemo />

        <TooltipArrow />
      </TooltipProvider>
    </div>
  );
}
