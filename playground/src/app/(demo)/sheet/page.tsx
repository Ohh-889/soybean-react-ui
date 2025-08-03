import { Card } from 'soybean-react-ui';

import ContentScrollable from './modules/ContentScrollable';
import Side from './modules/Side';

const SheetPage = () => {
  return (
    <Card title="Sheet">
      <div className="flex-c gap-4">
        <Side />

        <ContentScrollable />
      </div>
    </Card>
  );
};

export default SheetPage;
