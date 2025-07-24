import { Card } from 'soybean-react-ui';

import AutoClose from './modules/AutoClose';
import ControlState from './modules/ControlState';
import DefaultDemo from './modules/DefaultDemo';
import WithFooter from './modules/WithFooter';

const DialogPage = () => {
  return (
    <Card>
      <div className="flex-c gap-4">
        <DefaultDemo />
        <WithFooter />
        <ControlState />
        <AutoClose />
      </div>
    </Card>
  );
};

export default DialogPage;
