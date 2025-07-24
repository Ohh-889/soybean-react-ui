import DefaultDemo from './modules/DefaultDemo';
import DialogDemo from './modules/Dialog';

const CommandPage = () => {
  return (
    <div className="flex-c gap-4">
      <DefaultDemo />
      <DialogDemo />
    </div>
  );
};

export default CommandPage;
