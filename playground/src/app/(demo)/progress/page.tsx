import { Color } from './modules/Color';
import { Size } from './modules/Size';

export default function ProgressPage() {
  return (
    <div className="flex-c gap-4">
      <Color />

      <Size />
    </div>
  );
}
